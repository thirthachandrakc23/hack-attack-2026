import '../../styles/Components.css';

/**
 * Button Component
 * 
 * Reusable accessible button supporting multiple visual variants and sizes.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Label or content
 * @param {'primary' | 'secondary' | 'outline'} [props.variant='primary']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {boolean} [props.disabled=false]
 * @param {string} [props.type='button']
 * @param {Function} [props.onClick]
 * @param {string} [props.className='']
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  ...rest
}) {
  return (
    <button
      type={type}
      className={`sb-button variant-${variant} size-${size} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
