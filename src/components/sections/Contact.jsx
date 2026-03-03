import { sectionContent } from '../../data/waypoints';
import SectionHeader from '../shared/SectionHeader';

/**
 * Contact section — email CTA and social links.
 */
function Contact({ compact = false }) {
  const { heading, email, links, message } = sectionContent.contact;

  return (
    <section className={`section-contact ${compact ? 'section-contact--compact' : ''}`} id="contact">
      {!compact && <SectionHeader title={heading} />}
      {message && <p className="section-contact__message">{message}</p>}

      <a href={`mailto:${email}`} className="section-contact__email">
        {email}
      </a>

      <div className="section-contact__links">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="section-contact__link"
          >
            {link.label}
            <span className="section-contact__arrow">&rarr;</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Contact;
