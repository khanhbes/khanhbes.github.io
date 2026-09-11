window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-ready");

  const progress = document.querySelector(".scroll-progress");
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progress.style.width = `${Math.min(100, Math.max(0, percent))}%`;
  };

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((element) => element.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries, activeObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const delay = Number(entry.target.dataset.delay || 0);
          window.setTimeout(() => entry.target.classList.add("is-visible"), delay);
          activeObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -7%" },
    );

    reveals.forEach((element) => observer.observe(element));
  }

  if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    const depthTargets = document.querySelectorAll("[data-depth]");
    window.addEventListener(
      "pointermove",
      (event) => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        depthTargets.forEach((target) => {
          const depth = Number(target.dataset.depth || 0);
          target.style.translate = `${x * depth}px ${y * depth}px`;
        });
      },
      { passive: true },
    );
  }
});
