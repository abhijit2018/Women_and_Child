import LogoMark from "../../assets/logo-mark";
import "../../styles/Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__wave" aria-hidden="true" />

      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <LogoMark size={32} />
          <span>Women Portal</span>
        </div>

        <nav className="site-footer__links" aria-label="Footer Navigation">
          <a href="#about">About</a>
          <a href="#support">Get Support</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="site-footer__helpline">
          <span className="site-footer__helpline-label">
            24×7 Helpline
          </span>
          <span className="site-footer__helpline-number">
            1000-000-0000
          </span>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>© {year} Women Portal. All rights reserved.</p>
        <p>Your safety and privacy are our highest priorities.</p>
      </div>
    </footer>
  );
}

export default Footer;