import '../../styles/Components.css';

/**
 * Badge Component
 * 
 * Compact visual indicator for skills, availability status, and tags.
 *
 * @param {Object} props
 * @param {string} props.children - Badge content/text
 * @param {'skill' | 'status' | 'info' | 'warning'} [props.variant='skill']
 * @param {boolean} [props.active=false] - For filterable skill chips
 * @param {Function} [props.onClick] - Optional click handler for filterable badges
 */
function Badge({ children, variant = 'skill', active = false, onClick }) {
  const isInteractive = Boolean(onClick);

  return (
    <span
      className={`badge badge-${variant} ${active ? 'active' : ''}`}
      onClick={onClick}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      style={{ cursor: isInteractive ? 'pointer' : 'default' }}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </span>
  );
}

export default Badge;
