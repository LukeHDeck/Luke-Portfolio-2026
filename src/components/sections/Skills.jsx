import { sectionContent } from '../../data/waypoints';
import SectionHeader from '../shared/SectionHeader';

/**
 * Skills section — grouped by category with labels.
 */
function Skills({ compact = false }) {
  const { heading, categories } = sectionContent.skills;

  return (
    <section className={`section-skills ${compact ? 'section-skills--compact' : ''}`} id="skills">
      <SectionHeader title={heading} compact={compact} />
      <div className="section-skills__categories">
        {categories.map((cat) => (
          <div key={cat.label} className="section-skills__category">
            <h3 className="section-skills__category-label">{cat.label}</h3>
            <div className="section-skills__grid">
              {cat.items.map((skill) => (
                <span key={skill} className="section-skills__tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
