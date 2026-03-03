import { sectionContent } from '../../data/waypoints';
import SectionHeader from '../shared/SectionHeader';

/**
 * Process section — four-step workflow breakdown.
 * Data → Style → Automate → Deploy
 */
function Process({ compact = false }) {
  const { heading, steps } = sectionContent.process;

  return (
    <section className={`section-process ${compact ? 'section-process--compact' : ''}`} id="process">
      <SectionHeader title={heading} compact={compact} />
      <div className="section-process__steps">
        {steps.map((step, i) => (
          <div key={step.number} className="process-step">
            <div className="process-step__marker">
              <span className="process-step__number">{step.number}</span>
              {i < steps.length - 1 && <span className="process-step__line" />}
            </div>
            <div className="process-step__content">
              <h3 className="process-step__title">{step.title}</h3>
              <p className="process-step__description">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Process;
