/**
 * Reusable section header with title and optional subtitle.
 * Used across both map overlay panels and scroll experience sections.
 */
function SectionHeader({ title, subtitle, compact = false }) {
  return (
    <header className={`section-header ${compact ? 'section-header--compact' : ''}`}>
      <h2 className="section-header__title">{title}</h2>
      {subtitle && (
        <p className="section-header__subtitle">{subtitle}</p>
      )}
    </header>
  );
}

export default SectionHeader;
