import { useScrollReveal } from '../hooks/useScrollReveal';
import About from './sections/About';
import Skills from './sections/Skills';
import Certificates from './sections/Certificates';
import CaseStudies from './sections/CaseStudies';
import Featured from './sections/Featured';
import Contact from './sections/Contact';
import ModeToggle from './ModeToggle';
import ScrollNav from './ScrollNav';
import '../styles/scroll-experience.css';

/**
 * Scroll Experience — traditional, linear, dark-themed portfolio page.
 * All sections rendered in a single scrollable page with reveal animations.
 */
function ScrollExperience() {
  useScrollReveal();

  return (
    <div className="scroll-experience">
      <ModeToggle targetMode="map" />
      <ScrollNav />

      {/* Hero / About */}
      <div className="scroll-experience__hero">
        <About />
      </div>

      {/* Case Studies */}
      <div className="scroll-experience__section reveal">
        <CaseStudies />
      </div>

      {/* Featured */}
      <div className="scroll-experience__section reveal">
        <Featured />
      </div>

      {/* Skills */}
      <div className="scroll-experience__section reveal">
        <Skills />
      </div>

      {/* Certificates */}
      <div className="scroll-experience__section reveal">
        <Certificates />
      </div>

      {/* Contact */}
      <div className="scroll-experience__section scroll-experience__section--contact reveal">
        <Contact />
      </div>

      {/* Footer */}
      <footer className="scroll-experience__footer">
        <p>&copy; {new Date().getFullYear()} Luke Decker</p>
      </footer>
    </div>
  );
}

export default ScrollExperience;
