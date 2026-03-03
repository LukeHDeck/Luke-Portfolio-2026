import { sectionContent } from '../../data/waypoints';

/**
 * Renders a single media item (image or video).
 * Reused across hero, solution items, and gallery.
 */
function MediaItem({ media, className = '' }) {
  if (!media) return null;

  if (media.placeholder) {
    return (
      <div className={`case-study-showcase__placeholder ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="case-study-showcase__placeholder-icon">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
        <span className="case-study-showcase__placeholder-label">{media.alt || 'Image'}</span>
      </div>
    );
  }

  if (media.type === 'video') {
    return (
      <video
        src={media.src}
        controls
        playsInline
        className={`case-study-showcase__video ${className}`}
      />
    );
  }

  return (
    <img
      src={media.src}
      alt={media.alt || ''}
      className={`case-study-showcase__image ${className}`}
    />
  );
}

/**
 * Case Study Showcase — detailed view for an individual case study.
 * Used in the globe experience when a case study marker is clicked.
 *
 * Content follows a narrative arc:
 * Title → Overview → Challenge → Role → Solution → Impact → Results → Gallery → Tech Stack
 */
function CaseStudyShowcase({ caseStudyId, compact = false }) {
  const data = sectionContent[caseStudyId];
  if (!data) return null;

  const {
    title,
    subtitle,
    overview,
    challenge,
    role,
    solution,
    impact,
    results,
    tags,
    featuredImage,
    videoUrl,
    gallery,
    liveUrl,
    liveLabel,
  } = data;

  return (
    <div className={`case-study-showcase ${compact ? 'case-study-showcase--compact' : ''}`}>
      {/* Hero media area */}
      {(videoUrl || featuredImage) && (
        <div className="case-study-showcase__media">
          <MediaItem media={
            videoUrl
              ? { type: 'video', src: videoUrl }
              : featuredImage === 'placeholder'
                ? { placeholder: true, alt: 'Featured image' }
                : { type: 'image', src: featuredImage, alt: title }
          } />
        </div>
      )}

      {/* Title + Subtitle */}
      <div className="case-study-showcase__header">
        <h2 className="case-study-showcase__title">{title}</h2>
        <p className="case-study-showcase__subtitle">{subtitle}</p>
      </div>

      {/* Overview */}
      {overview && (
        <p className="case-study-showcase__overview">{overview}</p>
      )}

      {/* The Challenge */}
      {challenge && (
        <div className="case-study-showcase__section">
          <h3 className="case-study-showcase__section-label">The Challenge</h3>
          <p className="case-study-showcase__section-body">{challenge}</p>
        </div>
      )}

      {/* My Role */}
      {role && (
        <div className="case-study-showcase__section">
          <h3 className="case-study-showcase__section-label">My Role</h3>
          <p className="case-study-showcase__section-body">{role}</p>
        </div>
      )}

      {/* Solution — each item can have inline media */}
      {solution && solution.length > 0 && (
        <div className="case-study-showcase__section">
          <h3 className="case-study-showcase__section-label">Solution</h3>
          <div className="case-study-showcase__solution-list">
            {solution.map((item) => (
              <div key={item.heading} className="case-study-showcase__solution-item">
                <h4 className="case-study-showcase__solution-heading">{item.heading}</h4>
                <p className="case-study-showcase__section-body">{item.detail}</p>
                {item.media && (
                  <div className="case-study-showcase__solution-media">
                    <MediaItem media={item.media} />
                    {item.media.caption && (
                      <p className="case-study-showcase__media-caption">{item.media.caption}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Impact */}
      {impact && (
        <div className="case-study-showcase__section">
          <h3 className="case-study-showcase__section-label">Impact</h3>
          {Array.isArray(impact) ? (
            <ul className="case-study-showcase__impact-list">
              {impact.map((item) => (
                <li key={item} className="case-study-showcase__section-body">{item}</li>
              ))}
            </ul>
          ) : (
            <p className="case-study-showcase__section-body">{impact}</p>
          )}
        </div>
      )}

      {/* Results */}
      {results && results.length > 0 && (
        <div className="case-study-showcase__section">
          <h3 className="case-study-showcase__section-label">Results</h3>
          <div className="case-study-showcase__results">
            {results.map((r) => (
              <div key={r.label} className="case-study-showcase__result">
                <span className="case-study-showcase__result-metric">{r.metric}</span>
                <span className="case-study-showcase__result-label">{r.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gallery */}
      {gallery && gallery.length > 0 && (
        <div className="case-study-showcase__section">
          <h3 className="case-study-showcase__section-label">Gallery</h3>
          <div className="case-study-showcase__gallery">
            {gallery.map((item, i) => (
              <figure key={i} className="case-study-showcase__gallery-item">
                <div className="case-study-showcase__gallery-media">
                  <MediaItem media={item} />
                </div>
                {item.caption && (
                  <figcaption className="case-study-showcase__media-caption">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* Tech Stack */}
      {tags && tags.length > 0 && (
        <div className="case-study-showcase__tags">
          {tags.map((tag) => (
            <span key={tag} className="case-study-showcase__tag">{tag}</span>
          ))}
        </div>
      )}

      {/* External link */}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="case-study-showcase__live-link"
        >
          {liveLabel || 'View Project'} &rarr;
        </a>
      )}
    </div>
  );
}

export default CaseStudyShowcase;
