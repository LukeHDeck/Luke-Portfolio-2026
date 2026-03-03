import { useState, useEffect, useRef } from 'react';

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'featured', label: 'Featured' },
  { id: 'skills', label: 'Skills' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
];

/**
 * Sticky side nav for the scroll experience.
 * Tracks which section is in view via IntersectionObserver
 * and highlights the active item. Hidden on mobile.
 */
function ScrollNav() {
  const [activeId, setActiveId] = useState('about');
  const [visible, setVisible] = useState(false);
  const clickedRef = useRef(null);

  useEffect(() => {
    let observerActiveId = 'about';

    function updateActive() {
      // If user just clicked a nav item, lock to that until scroll settles
      if (clickedRef.current) return;

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      if (atBottom) {
        setActiveId('contact');
      } else {
        setActiveId(observerActiveId);
      }
    }

    function handleScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.5);
      updateActive();
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observerActiveId = entry.target.id;
            updateActive();
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  function handleClick(id) {
    const el = document.getElementById(id);
    if (!el) return;

    // Immediately set active and lock it during the scroll animation
    setActiveId(id);
    clickedRef.current = id;

    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });

    // Release the lock after scroll animation completes
    setTimeout(() => {
      clickedRef.current = null;
    }, 800);
  }

  return (
    <nav className={`scroll-nav ${visible ? 'scroll-nav--visible' : ''}`} aria-label="Section navigation">
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          className={`scroll-nav__item ${activeId === section.id ? 'scroll-nav__item--active' : ''}`}
          onClick={() => handleClick(section.id)}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
}

export default ScrollNav;
