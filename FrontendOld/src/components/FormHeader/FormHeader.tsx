import { Link } from 'react-router-dom';
import LogoMark from '../../assets/logo-mark';
import LogoPartner from '../../assets/logo-partner';
import './FormHeader.css';

interface FormHeaderProps {
  formName: string;
}

/**
 * Header used on form/task pages: brand logo on the left, the current
 * form's name centered, and the partner emblem on the right.
 */
function FormHeader({ formName }: FormHeaderProps) {
  return (
    <header className="form-header">
      <div className="form-header__inner container">
        <Link to="/" className="form-header__side form-header__side--left" aria-label="Women Portal home">
          <LogoMark size={34} />
        </Link>

        <h1 className="form-header__title">{formName}</h1>

        <div className="form-header__side form-header__side--right">
          <LogoPartner size={30} />
        </div>
      </div>
    </header>
  );
}

export default FormHeader;
