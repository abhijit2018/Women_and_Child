import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/NavBar.css";

interface NavChild {
  label: string;
  to: string;
}

interface NavItem {
  label: string;
  to?: string;
  children?: NavChild[];
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/' },
  {
    label: 'About Us',
    children: [
      { label: 'Our Mission', to: '/about/mission' },
      { label: 'Our Team', to: '/about/team' },
      { label: 'History', to: '/about/history' },
    ],
  },
  {
    label: "Women's Rights",
    children: [
      { label: 'Legal Rights', to: '/rights/legal' },
      { label: 'Safety Guidelines', to: '/rights/safety' },
      { label: 'Helplines', to: '/rights/helplines' },
    ],
  },
  // { label: 'File a Complaint', to: '/onlinecomplaints' },
     {
    label: 'File a Complaint',
    children: [
      { label: 'Missing Women or Child', to: '/onlinecomplaints' },
      { label: 'Crime againts Women or Child', to: '/onlinecomplaints' },
      { label: 'Human Trafficking', to: '/onlinecomplaints' },
    ],
  },
{ label: 'Complaint Status Check', to: '/complaint-status' },
  {
    label: 'Resources',
    children: [
      { label: 'Guides', to: '/resources/guides' },
      { label: 'FAQs', to: '/resources/faqs' },
      { label: 'Downloads', to: '/resources/downloads' },
    ],
  },
  { label: 'Legal Framework', to: '/legal-framework' },
  { label: 'RTI', to: '/rti' },
  { label: 'Contact Us', to: '/contact' },
];

function NavBar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  // Close any open dropdown on outside click.
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenIndex(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function toggleDropdown(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <nav className="sub-nav" ref={navRef} aria-label="Primary">
      <ul className="sub-nav__list container">
        {NAV_ITEMS.map((item, index) => {
          const hasChildren = Boolean(item.children?.length);
          const isOpen = openIndex === index;

          return (
            <li
              key={item.label}
              className={`sub-nav__item ${hasChildren ? 'sub-nav__item--dropdown' : ''}`}
            >
              {hasChildren ? (
                <>
                  <button
                    type="button"
                    className="sub-nav__link"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    onClick={() => toggleDropdown(index)}
                  >
                    {item.label}
                    <svg
                      className={`sub-nav__chevron ${isOpen ? 'sub-nav__chevron--open' : ''}`}
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      aria-hidden="true"
                    >
                      <path
                        d="M2.5 4.5L6 8l3.5-3.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {isOpen && (
                    <ul className="sub-nav__dropdown">
                      {item.children?.map((child) => (
                        <li key={child.label}>
                          <Link
                            to={child.to}
                            state={{ complaintType: child.label }}
                            className="sub-nav__dropdown-link"
                            onClick={() => setOpenIndex(null)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link to={item.to ?? '/'} className="sub-nav__link">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavBar;
