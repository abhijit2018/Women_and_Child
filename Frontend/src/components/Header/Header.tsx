import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import './Header.css';

/**
 * Fixed, highlighted site header.
 * Left:  brand logo | vertical divider | portal name
 * Right: partner emblem + Login button
 */
function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner ">

        <Link to="/" className="site-header__brand">
          <img
            src="/images/logo_w.png"
            alt="Protection of Women & Children Portal"
            className="site-header__logo"
          />

          <span className="site-header__divider" />

          <span className="site-header__name">
            Protection of Women & Children Portal
          </span>
        </Link>

        <div className="site-header__right">
          <img
            src="/images/logo_s.png"
            alt="Partner Logo"
            className="site-header__partner-logo"
          />

          <Button variant="primary" size="sm">
            Login
          </Button>
        </div>

      </div>
    </header>
  );
}

export default Header;
