import { Link } from 'react-router-dom';
import LogoMark from '../../../assets/logo-mark';
import LogoPartner from '../../../assets/logo-partner';
import "../../../styles/FormHeader.css";

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
        <div className="form-header__message">
          <p className="form-header__title">{formName}</p>
        </div>
    </header>
  );
}

export default FormHeader;
