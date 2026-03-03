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
    </section>
  );
}

export default About;
