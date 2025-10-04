<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  const gameUrl = '/vibe-rally/index.html';

  let iframeEl: HTMLIFrameElement | null = null;
  let showTouchHelp = false;
  let isLoaded = false;
  let loadError = false;
  let reducedMotion = false;
  let loadTimer: ReturnType<typeof setTimeout> | null = null;

  const focusGame = () => {
    iframeEl?.focus();
    iframeEl?.contentWindow?.focus?.();
  };

  const handleLoad = () => {
    isLoaded = true;
    loadError = false;
    if (loadTimer) {
      clearTimeout(loadTimer);
      loadTimer = null;
    }
  };

  const handleError = () => {
    loadError = true;
  };

  onMount(() => {
    if (!browser) {
      return () => {};
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => {
      reducedMotion = mediaQuery.matches;
    };
    updateMotion();
    mediaQuery.addEventListener('change', updateMotion);

    const pointerQuery = window.matchMedia('(pointer: coarse)');
    if (pointerQuery.matches) {
      showTouchHelp = true;
    }

    loadTimer = window.setTimeout(() => {
      if (!isLoaded) {
        loadError = true;
      }
    }, 12000);

    return () => {
      mediaQuery.removeEventListener('change', updateMotion);
      if (loadTimer) {
        clearTimeout(loadTimer);
        loadTimer = null;
      }
    };
  });
</script>

<svelte:head>
  <title>Vibe Atlas — Vibe Rally</title>
  <meta
    name="description"
    content="Slide around a Godot-made rally playground with keyboard, gamepad, or touch controls tuned for every screen."
  />
</svelte:head>

<section class="drive" aria-labelledby="drive-title">
  <div class="drive-intro">
    <p class="eyebrow">GODOT GARAGE</p>
    <h1 id="drive-title">Vibe Rally</h1>
    <p>
      Strap into our custom Godot rally toy built straight from source. The project exports at build time, so the driving
      physics, UI, and touch overlays always match the latest code in this repo.
    </p>
    <div class="drive-actions">
      <button class="button" type="button" on:click={focusGame}>
        Focus the game canvas
      </button>
      <button
        class="button secondary"
        type="button"
        aria-pressed={showTouchHelp}
        on:click={() => (showTouchHelp = !showTouchHelp)}
      >
        {showTouchHelp ? 'Hide touch overlay tips' : 'Show touch overlay tips'}
      </button>
    </div>
    <div class="drive-status" aria-live="polite">
      {#if loadError}
        <p>
          Having trouble loading the demo? Make sure your browser allows WebAssembly threads and try refreshing. If the issue
          persists, open the game in a new tab.
        </p>
      {:else if isLoaded}
        <p>Game ready — hit the gas!</p>
      {:else}
        <p>Loading the Godot runtime…</p>
      {/if}
    </div>
    {#if reducedMotion}
      <p class="drive-callout" role="note">
        Heads-up: this 3D demo ignores reduced-motion preferences. Pause the game if the movement feels overwhelming.
      </p>
    {/if}
  </div>

  <div class="drive-layout">
    <aside class="controls" aria-label="Control reference">
      <h2>How to drive</h2>
      <ul>
        <li><span class="key">W</span> / <span class="key">↑</span> — Accelerate</li>
        <li><span class="key">S</span> / <span class="key">↓</span> — Brake & reverse</li>
        <li><span class="key">A</span> / <span class="key">D</span> — Steer</li>
        <li><span class="key">Space</span> — Handbrake</li>
        <li><span class="key">Space</span> — Handbrake for snappier drifts</li>
        <li>Gamepad left stick steers, triggers move, and the bottom face button grabs the brake</li>
      </ul>
      <p>Need more room? Use the fullscreen button inside the game HUD.</p>

      <div class:touch-visible={showTouchHelp} class="touch-helper" aria-live="polite">
        <h3>Touch quickstart</h3>
        <ul>
          <li>Left pads steer — tap and hold either arrow to swing the front wheels.</li>
          <li>Right pads manage speed — the blue arrow accelerates, the gold one brakes.</li>
          <li>Mix pads to drift around the painted guide loop.</li>
          <li>Need a breather? Lift every finger and the car will settle itself.</li>
        </ul>
      </div>
    </aside>

    <div class="game-shell">
      <div class="game-frame">
        <iframe
          bind:this={iframeEl}
          src={gameUrl}
          title="Vibe Rally Godot playground"
          aria-label="Interactive Godot rally driving experience"
          allow="autoplay; fullscreen; gamepad; xr-spatial-tracking"
          allowfullscreen
          loading="lazy"
          tabindex="-1"
          on:load={handleLoad}
          on:error={handleError}
        ></iframe>
      </div>
      <p class="game-fallback">
        If the game never loads, <a href="/vibe-rally/index.html" target="_blank" rel="noopener">open it directly</a>.
      </p>
    </div>
  </div>
</section>

<style>
  :global(body[data-transition-state='animating']) .drive {
    pointer-events: none;
  }

  .drive {
    display: grid;
    gap: clamp(1.5rem, 3vw, 2.5rem);
  }

  .drive-intro {
    display: grid;
    gap: 1rem;
  }

  .eyebrow {
    font-size: 0.75rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--accent, #f4bfff);
  }

  .drive-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .drive-status p {
    margin: 0;
    font-size: 0.95rem;
  }

  .drive-callout {
    background: rgba(255, 255, 255, 0.08);
    border-left: 3px solid rgba(255, 255, 255, 0.35);
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    max-width: 28rem;
  }

  .drive-layout {
    display: grid;
    gap: clamp(1.25rem, 2vw, 2rem);
    align-items: start;
  }

  .controls {
    background: rgba(21, 21, 32, 0.55);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 1rem;
    padding: clamp(1rem, 2vw, 1.5rem);
    display: grid;
    gap: 0.75rem;
  }

  .controls h2 {
    margin: 0;
    font-size: 1.25rem;
  }

  .controls ul {
    margin: 0;
    padding-left: 1.25rem;
    display: grid;
    gap: 0.35rem;
  }

  .key {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    padding: 0.25rem 0.45rem;
    border-radius: 0.4rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.18);
    font-family: 'JetBrains Mono', 'Fira Mono', monospace;
    font-size: 0.75rem;
  }

  .touch-helper {
    border-radius: 0.75rem;
    border: 1px dashed rgba(255, 255, 255, 0.2);
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    display: none;
    gap: 0.5rem;
  }

  .touch-helper h3 {
    margin: 0;
    font-size: 1rem;
  }

  .touch-helper ul {
    margin: 0;
    padding-left: 1.1rem;
    display: grid;
    gap: 0.35rem;
  }

  .touch-helper.touch-visible {
    display: grid;
  }

  .game-shell {
    display: grid;
    gap: 0.75rem;
  }

  .game-frame {
    position: relative;
    border-radius: 1.25rem;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: radial-gradient(circle at top, rgba(126, 224, 255, 0.2), rgba(24, 22, 45, 0.85));
    box-shadow: 0 1.25rem 3rem rgba(0, 0, 0, 0.45);
  }

  .game-frame::before {
    content: '';
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
  }

  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
    background: #000;
    border-radius: inherit;
  }

  .game-fallback {
    margin: 0;
    font-size: 0.9rem;
  }

  .game-fallback a {
    color: inherit;
    text-decoration: underline;
  }

  @media (min-width: 52rem) {
    .drive {
      grid-template-columns: minmax(0, 1fr);
    }

    .drive-layout {
      grid-template-columns: minmax(16rem, 0.9fr) minmax(0, 2.1fr);
    }
  }

  @media (max-width: 40rem) {
    .drive-actions {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
