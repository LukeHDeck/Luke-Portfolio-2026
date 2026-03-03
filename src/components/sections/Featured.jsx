import { sectionContent } from '../../data/waypoints';
import SectionHeader from '../shared/SectionHeader';

/**
 * Featured section — videos and publications list.
 */
function Featured({ compact = false }) {
  const { heading, items } = sectionContent.featured;

  return (
    <section className={`section-featured ${compact ? 'section-featured--compact' : ''}`} id="featured">
      <SectionHeader title={heading} compact={compact} />
      <div className="section-featured__list">
        {items.map((item) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="featured-item"
          >
            <div className="featured-item__info">
              <h3 className="featured-item__title">{item.title}</h3>
              <p className="featured-item__meta">
                <span className="featured-item__source">{item.source}</span>
                <span className="featured-item__sep">/</span>
                <span className="featured-item__type">{item.type === 'video' ? 'Video' : 'Article'}</span>
              </p>
            </div>
            <span className="featured-item__arrow">&rarr;</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Featured;
