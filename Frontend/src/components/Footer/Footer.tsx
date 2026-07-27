import LogoMark from '../../assets/logo-mark';
import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__wave" aria-hidden="true" />
      <div className="site-footer__inner container">
        <div className="site-footer__brand">
          <LogoMark size={32} />
          <span>Women Portal</span>
        </div>

        <nav className="site-footer__links" aria-label="Footer">
          <a href="#learn-more">About</a>
          <a href="/get-support">Get Support</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="site-footer__helpline">
          <span className="site-footer__helpline-label">24×7 Helpline</span>
          <span className="site-footer__helpline-number">1000-000-0000</span>
        </div>
      </div>

      <div className="site-footer__bottom container">
        <p>© {year} Women Portal. All rights reserved.</p>
        <p>This is a confidential service. Your safety is our priority.</p>
      </div>
    </footer>
  );
}

export default Footer;
