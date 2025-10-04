<script lang="ts">
  import { goto } from '$app/navigation';

  const navigate = (event: MouseEvent, target: string) => {
    event.preventDefault();
    goto(target);
  };

  const highlights = [
    {
      icon: '🌌',
      title: 'Nebula narratives',
      description:
        'Layered gradients and glassy surfaces channel a midnight observatory where each click reveals another cosmic mood.'
    },
    {
      icon: '🎚️',
      title: 'Responsive rhythm',
      description:
        'Transitions lean on GPU-friendly transforms so every device gets a smooth, 420ms glide without jank.'
    },
    {
      icon: '♿',
      title: 'Accessible delight',
      description:
        'Skip links, focus rings, and reduced-motion paths keep the vibe inclusive for every explorer.'
    }
  ];
</script>

<svelte:head>
  <title>Vibe Atlas — Home</title>
</svelte:head>

<section class="hero" aria-labelledby="hero-title">
  <p class="hero-eyebrow">THE ASTRAL VIBE TRAIL</p>
  <h1 id="hero-title">Stumble into a pocket universe of animated moods.</h1>
  <p>
    This micro-site is a vibe-coded postcard from the future. Two destinations, one buttery smooth transition, and
    handcrafted CSS that glows without a framework in sight.
  </p>
  <div class="actions">
    <a
      class="button"
      href="/dummy"
      data-sveltekit-prefetch
      on:click={(event) => navigate(event, '/dummy')}
    >Ride the dummy wave</a>
    <a class="button secondary" href="#vibe-highlights">Preview the vibe map</a>
  </div>
</section>

<section id="vibe-highlights" class="vibe-grid" aria-label="Vibe highlights">
  {#each highlights as highlight}
    <article class="vibe-card" aria-label={highlight.title}>
      <span aria-hidden="true">{highlight.icon}</span>
      <h2>{highlight.title}</h2>
      <p>{highlight.description}</p>
    </article>
  {/each}
</section>

<section class="pulse-band" aria-label="Transition stats">
  <div class="vibe-card" style="min-height: auto">
    <h2>Transition recipe</h2>
    <p>
      Fly + scale combo, easing with <code>cubic-bezier(0.16, 1, 0.3, 1)</code>, 420ms duration, and graceful fallbacks when
      motion is toned down.
    </p>
  </div>
</section>
