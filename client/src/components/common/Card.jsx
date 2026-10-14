import '../../styles/Components.css';

/**
 * Card Component
 * 
 * Consistent container card with subtle borders and shadows.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {boolean} [props.hoverable=true]
 * @param {string} [props.className='']
 * @param {Object} [props.style={}]
 */
function Card({ children, hoverable = true, className = '', style = {}, ...rest }) {
  return (
    <div
      className={`sb-card ${hoverable ? 'hoverable' : ''} ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
