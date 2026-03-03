import { sectionContent } from '../../data/waypoints';
import SectionHeader from '../shared/SectionHeader';

/**
 * Testimonials section — client and collaborator quotes.
 */
function Testimonials({ compact = false }) {
  const { heading, items } = sectionContent.testimonials;

  return (
    <section className={`section-testimonials ${compact ? 'section-testimonials--compact' : ''}`} id="testimonials">
      <SectionHeader title={heading} compact={compact} />
      <div className="section-testimonials__list">
        {items.map((item, index) => (
          <blockquote key={index} className="testimonial-item">
            <p className="testimonial-item__quote">&ldquo;{item.quote}&rdquo;</p>
            <footer className="testimonial-item__footer">
              <cite className="testimonial-item__author">{item.author}</cite>
              <span className="testimonial-item__sep">/</span>
              <span className="testimonial-item__company">{item.company}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
