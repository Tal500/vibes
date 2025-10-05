<script lang="ts">
  import '$lib/styles/theme.css';
  import '$lib/styles/animations.css';
  import { page } from '$app/stores';
  import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import { readable, writable } from 'svelte/store';
  import { fly, scale, fade } from 'svelte/transition';
  import { cubicOut, cubicInOut } from 'svelte/easing';
  import { onMount, onDestroy } from 'svelte';

  const prefersReducedMotion = readable(false, (set) => {
    if (!browser) {
      set(false);
      return () => {};
    }

    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => set(query.matches);
    update();
    query.addEventListener('change', update);

    return () => query.removeEventListener('change', update);
  });

  let mainEl: HTMLElement | null = null;
  const mainState = writable<'idle' | 'animating'>('idle');
  let animationDepth = 0;
  let reduceMotion = false;
  let animationTimeout: ReturnType<typeof setTimeout> | undefined;
  let navigationTriggered = false;

  const navClass = (isActive: boolean) => (isActive ? 'nav-link active' : 'nav-link');

  const navigate = (event: MouseEvent, target: string) => {
    event.preventDefault();
    if (!reduceMotion) {
      navigationTriggered = true;
      triggerAnimationFlag();
    }
    goto(target);
  };

  const recordTransition = (state: 'animating' | 'idle') => {
    if (!browser) return;
    const history = window.__vibesTransitions ?? [];
    history.push(state);
    window.__vibesTransitions = history;
  };

  const triggerAnimationFlag = () => {
    if (reduceMotion) return;
    if (animationTimeout) {
      clearTimeout(animationTimeout);
    }
    mainState.set('animating');
    if (browser) {
      document.documentElement.dataset.transitionState = 'animating';
      const current = Number(sessionStorage.getItem('vibesTransitionCount') ?? '0') + 1;
      sessionStorage.setItem('vibesTransitionCount', String(current));
      sessionStorage.setItem('vibesTransitionState', 'animating');
      window.dispatchEvent(new CustomEvent('vibes:transition', { detail: 'animating' }));
      recordTransition('animating');
    }
    animationTimeout = setTimeout(() => {
      animationTimeout = undefined;
      if (animationDepth === 0) {
        mainState.set('idle');
        if (browser) {
          document.documentElement.dataset.transitionState = 'idle';
          sessionStorage.setItem('vibesTransitionState', 'idle');
          window.dispatchEvent(new CustomEvent('vibes:transition', { detail: 'idle' }));
          recordTransition('idle');
        }
      }
    }, 520);
  };

  const markAnimating = () => {
    animationDepth += 1;
    triggerAnimationFlag();
  };

  const markIdle = () => {
    animationDepth = Math.max(0, animationDepth - 1);
    if (animationDepth === 0 && !reduceMotion) {
      if (animationTimeout) {
        clearTimeout(animationTimeout);
        animationTimeout = undefined;
      }
      mainState.set('idle');
      if (browser) {
        document.documentElement.dataset.transitionState = 'idle';
        sessionStorage.setItem('vibesTransitionState', 'idle');
        window.dispatchEvent(new CustomEvent('vibes:transition', { detail: 'idle' }));
        recordTransition('idle');
      }
    }
  };

  const unsubscribeMotion = prefersReducedMotion.subscribe((value) => {
    reduceMotion = value;
    if (reduceMotion) {
      mainState.set('idle');
      if (browser) {
        document.documentElement.dataset.transitionState = 'idle';
        sessionStorage.setItem('vibesTransitionState', 'idle');
        window.dispatchEvent(new CustomEvent('vibes:transition', { detail: 'idle' }));
        recordTransition('idle');
      }
    }
  });

  beforeNavigate(() => {
    if (reduceMotion) return;
    if (navigationTriggered) {
      navigationTriggered = false;
      return;
    }
    triggerAnimationFlag();
  });

  afterNavigate(() => {
    navigationTriggered = false;
    if (mainEl) {
      requestAnimationFrame(() => {
        mainEl?.focus({ preventScroll: true });
      });
    }
  });

  onMount(() => {
    if (browser) {
      document.documentElement.dataset.transitionState = 'idle';
      document.body.dataset.appReady = 'true';
      if (!sessionStorage.getItem('vibesTransitionCount')) {
        sessionStorage.setItem('vibesTransitionCount', '0');
      }
      sessionStorage.setItem('vibesTransitionState', 'idle');
      window.__vibesTransitions = window.__vibesTransitions ?? [];
      window.__vibesTransitions.push('idle');
    }
    if (mainEl) {
      mainEl.focus({ preventScroll: true });
    }
  });

  onDestroy(() => {
    if (animationTimeout) {
      clearTimeout(animationTimeout);
    }
    unsubscribeMotion();
  });
</script>

<svelte:head>
  <title>Vibe Atlas · Animated SvelteKit Playground</title>
  <meta
    name="description"
    content="A two-stop vibe atlas that shows off smooth SvelteKit transitions, custom CSS, and delightful motion."
  />
</svelte:head>

<a href="#main" class="skip-link">Skip to main content</a>
<header class="site-header">
  <div class="site-brand" aria-label="Vibe Atlas home">
    <span aria-hidden="true">✨</span>
    <strong>Vibe Atlas</strong>
  </div>
  <nav aria-label="Main navigation">
    <a
      href="/"
      class={navClass($page.url.pathname === '/')}
      data-sveltekit-prefetch
      on:click={(event) => navigate(event, '/')}
      aria-current={$page.url.pathname === '/' ? 'page' : undefined}
    >Home</a>
    <a
      href="/dummy"
      class={navClass($page.url.pathname.startsWith('/dummy'))}
      data-sveltekit-prefetch
      on:click={(event) => navigate(event, '/dummy')}
      aria-current={$page.url.pathname.startsWith('/dummy') ? 'page' : undefined}
    >
      Dummy vibe
    </a>
    <a
      href="/drive"
      class={navClass($page.url.pathname.startsWith('/drive'))}
      data-sveltekit-prefetch
      on:click={(event) => navigate(event, '/drive')}
      aria-current={$page.url.pathname.startsWith('/drive') ? 'page' : undefined}
    >
      Drive
    </a>
  </nav>
</header>

<main
  id="main"
  tabindex="-1"
  bind:this={mainEl}
  aria-live="polite"
  data-transition-state={$mainState}
  data-motion={$prefersReducedMotion ? 'reduced' : 'full'}
>
  {#key $page.url.pathname}
    {#if $prefersReducedMotion}
      <section class="page-surface reduced">
        <div class="page-inner">
          <slot />
        </div>
      </section>
    {:else}
      <section
        class="page-surface"
        in:fly={{ y: 32, duration: 420, easing: cubicOut }}
        out:fly={{ y: -28, duration: 320, easing: cubicOut }}
        on:introstart={markAnimating}
        on:outrostart={markAnimating}
        on:introend={markIdle}
        on:outroend={markIdle}
      >
        <div
          class="page-inner"
          in:scale={{ start: 0.92, duration: 420, easing: cubicOut }}
          out:fade={{ duration: 220, easing: cubicInOut }}
        >
          <slot />
        </div>
        <div class="gradient-orb" aria-hidden="true"></div>
        <div class="gradient-orb" aria-hidden="true"></div>
      </section>
    {/if}
  {/key}
</main>

<footer class="site-footer">
  <span>Crafted for the vibes — always accessible, always playful.</span>
  <a href="https://svelte.dev" rel="noreferrer" target="_blank">Powered by SvelteKit 5</a>
</footer>
