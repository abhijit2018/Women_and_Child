import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
}

/**
 * Shared button. `as="link"` renders an <a>-like button for same-page
 * actions handled by the router elsewhere; default renders <button>.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  onClick,
  fullWidth = false,
  disabled = false,
}: ButtonProps) {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? 'btn--full' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
