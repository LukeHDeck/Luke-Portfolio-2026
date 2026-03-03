import { sectionContent } from '../../data/waypoints';
import SectionHeader from '../shared/SectionHeader';

/**
 * Certificates section — clean list layout.
 */
function Certificates({ compact = false }) {
  const { heading, items } = sectionContent.certificates;

  return (
    <section className={`section-certificates ${compact ? 'section-certificates--compact' : ''}`} id="certificates">
      <SectionHeader title={heading} compact={compact} />
      <div className="section-certificates__list">
        {items.map((cert) => (
          <div key={cert.title} className="certificate-item">
            <div className="certificate-item__info">
              <h3 className="certificate-item__title">{cert.title}</h3>
              <p className="certificate-item__issuer">{cert.issuer}</p>
            </div>
            <span className="certificate-item__year">{cert.year}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Certificates;
