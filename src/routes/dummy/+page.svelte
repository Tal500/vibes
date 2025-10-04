<script lang="ts">
  import { goto } from '$app/navigation';

  const navigate = (event: MouseEvent, target: string) => {
    event.preventDefault();
    goto(target);
  };
</script>

<svelte:head>
  <title>Vibe Atlas — Dummy Vibe</title>
</svelte:head>

<section class="hero" aria-labelledby="dummy-title">
  <p class="hero-eyebrow">DUMMY, BUT MAKE IT ART</p>
  <h1 id="dummy-title">A sandbox signal for experimenting with vibes.</h1>
  <p>
    Consider this the proving ground for micro-interactions. We stage transitions, test gradients, and tune accessibility so
    every future vibe-coded build launches with confidence.
  </p>
  <div class="actions">
    <a
      class="button"
      href="/"
      data-sveltekit-prefetch
      on:click={(event) => navigate(event, '/')}
    >Return to home base</a>
    <a class="button secondary" href="#dummy-timeline">Peek at the playbook</a>
  </div>
</section>

<section id="dummy-timeline" class="timeline" aria-label="Prototype playbook">
  <article class="timeline-step">
    <h2>01 · Frame the feeling</h2>
    <p>
      Establish the palette, typography, and motion language before a single component ships. Intentional vibes beat ad-hoc
      styling every time.
    </p>
  </article>
  <article class="timeline-step">
    <h2>02 · Prototype the motion</h2>
    <p>
      Pair Svelte transitions with CSS variables so tuning the experience is as simple as adjusting one token.
    </p>
  </article>
  <article class="timeline-step">
    <h2>03 · Lock in accessibility</h2>
    <p>
      Confirm focus paths, reduced-motion behavior, and contrast all pass muster. Vibes mean nothing without inclusion.
    </p>
  </article>
</section>
