import { useEffect } from 'react';

/**
 * Observes elements with the 'reveal' or 'reveal-stagger' class
 * and adds '--visible' when they enter the viewport.
 * Call once in the scroll experience root component.
 */
export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            if (el.classList.contains('reveal')) {
              el.classList.add('reveal--visible');
            }
            if (el.classList.contains('reveal-stagger')) {
              el.classList.add('reveal-stagger--visible');
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal, .reveal-stagger');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
