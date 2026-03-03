import { sectionContent } from '../../data/waypoints';

/**
 * About section — introduction and bio.
 * Used in both map overlay panels and scroll experience.
 */
function About({ compact = false }) {
  const { heading, subheading, body } = sectionContent.about;

  return (
    <section className={`section-about ${compact ? 'section-about--compact' : ''}`} id="about">
      <h1 className="section-about__name">{heading}</h1>
      <p className="section-about__role">{subheading}</p>
      <div className="section-about__body">
        <p>{body}</p>
      </div>
      <div className="section-about__stats">
        <div className="section-about__stat">
          <span className="section-about__stat-number">200+</span>
          <span className="section-about__stat-label">Maps Designed</span>
        </div>
        <div className="section-about__stat-divider" />
        <div className="section-about__stat">
          <span className="section-about__stat-number">115+</span>
          <span className="section-about__stat-label">In Production</span>
        </div>
      </div>

      {/* Desktop scroll indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}

export default About;
