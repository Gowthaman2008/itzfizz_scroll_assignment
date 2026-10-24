document.addEventListener('DOMContentLoaded', () => {
  const headline = document.getElementById('headline');

  if (!headline) return;

  const words = ['WELCOME', 'ITZFIZZ'];
  words.forEach((word, index) => {
    const wordWrap = document.createElement('span');
    wordWrap.className = 'headline-word';

    [...word].forEach((char) => {
      const charEl = document.createElement('span');
      charEl.className = 'headline-letter';
      charEl.textContent = char;
      charEl.setAttribute('aria-hidden', 'true');
      wordWrap.appendChild(charEl);
    });

    if (index === 0) {
      headline.appendChild(wordWrap);
      const gap = document.createElement('span');
      gap.className = 'headline-gap';
      headline.appendChild(gap);
    } else {
      headline.appendChild(wordWrap);
    }
  });

  const letters = gsap.utils.toArray('.headline-letter');
  const statItems = gsap.utils.toArray('.stat-item');
  const carVisual = document.getElementById('carVisual');

  const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });

  intro
    .fromTo(
      letters,
      { opacity: 0, y: 42, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, stagger: 0.06 },
      0
    )
    .fromTo(
      statItems,
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.14, ease: 'power3.out' },
      0.15
    )
    .fromTo(
      carVisual,
      { opacity: 0, x: -120, y: 24 },
      { opacity: 1, x: 0, y: 0, duration: 1.2, ease: 'power3.out' },
      0.15
    );

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set(letters, { opacity: 1, y: 0, filter: 'blur(0px)' });
    gsap.set(statItems, { opacity: 1, y: 0 });
    gsap.set(carVisual, { opacity: 1, x: 0, y: 0 });
    return;
  }

  const heroTrigger = {
    trigger: '#hero',
    start: 'top top',
    end: '+=130%',
    scrub: 1.1,
    pin: true,
    invalidateOnRefresh: true,
    anticipatePin: 1,
  };

  gsap.to(carVisual, {
    scrollTrigger: heroTrigger,
    x: () => window.innerWidth * 0.23,
    y: () => -window.innerHeight * 0.08,
    scale: 1.25,
    rotation: -4,
    ease: 'none',
    force3D: true,
  });

  gsap.to('.shadow', {
    scrollTrigger: heroTrigger,
    scaleX: 1.6,
    scaleY: 1.7,
    opacity: 0.8,
    ease: 'none',
  });

  gsap.to('.wheel .spin', {
    scrollTrigger: heroTrigger,
    rotation: 720,
    ease: 'none',
    transformOrigin: '50% 50%',
  });

  gsap.to('.hero-copy', {
    scrollTrigger: heroTrigger,
    opacity: 0,
    scale: 0.88,
    y: -55,
    ease: 'none',
  });

  gsap.to('.stat-item', {
    scrollTrigger: heroTrigger,
    opacity: 0,
    y: -20,
    scale: 0.8,
    stagger: 0.08,
    ease: 'none',
  });

  ScrollTrigger.refresh();
});
