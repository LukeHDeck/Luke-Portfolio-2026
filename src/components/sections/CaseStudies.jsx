import { useState, useEffect, useRef } from 'react';
import SectionHeader from '../shared/SectionHeader';
import CaseStudyShowcase from './CaseStudyShowcase';

/**
 * Case Studies section — project cards fetched from JSON.
 *
 * Card structure follows Simon Pan's homepage pattern:
 * Title → Subtitle → Result highlight → Tags
 *
 * Clicking a card expands it inline to show the full case study detail
 * via CaseStudyShowcase.
 */
function CaseStudies({ compact = false }) {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetch('./data/case-studies.json')
      .then((res) => res.json())
      .then((data) => {
        setStudies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load case studies:', err);
        setLoading(false);
      });
  }, []);

  const cardRefs = useRef({});

  function handleCardClick(id) {
    const next = expandedId === id ? null : id;
    setExpandedId(next);
    if (next) {
      requestAnimationFrame(() => {
        cardRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  return (
    <section className={`section-case-studies ${compact ? 'section-case-studies--compact' : ''}`} id="case-studies">
      <SectionHeader title="Selected Work" compact={compact} />

      {loading ? (
        <p className="section-case-studies__loading">Loading projects...</p>
      ) : (
        <div className="section-case-studies__grid">
          {studies.map((study) => {
            const isExpanded = expandedId === study.id;

            return (
              <article
                key={study.id}
                ref={(el) => { cardRefs.current[study.id] = el; }}
                className={`case-study-card ${isExpanded ? 'case-study-card--expanded' : ''}`}
                onClick={() => !isExpanded && handleCardClick(study.id)}
              >
                {isExpanded ? (
                  <>
                    <button
                      className="case-study-card__close case-study-card__close--floating"
                      onClick={(e) => { e.stopPropagation(); setExpandedId(null); }}
                      aria-label="Close case study"
                    >
                      &times;
                    </button>
                    <div className="case-study-card__detail">
                      <CaseStudyShowcase caseStudyId={study.id} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="case-study-card__header">
                      <h3 className="case-study-card__title">{study.title}</h3>
                      <span className="case-study-card__arrow">&rarr;</span>
                    </div>
                    <p className="case-study-card__subtitle">{study.subtitle}</p>
                    {study.resultHighlight && (
                      <p className="case-study-card__result">{study.resultHighlight}</p>
                    )}
                    <p className="case-study-card__description">{study.overview}</p>
                    {study.tags && (
                      <div className="case-study-card__tags">
                        {study.tags.map((tag) => (
                          <span key={tag} className="case-study-card__tag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default CaseStudies;
