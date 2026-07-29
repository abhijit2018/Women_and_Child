import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="container-custom flex items-center justify-between h-16">

      {/* Logo */}
      <div>
        <Link
          to="/"
          className="text-xl font-bold text-blue-600"
        >
          My Website
        </Link>
      </div>


      {/* Menu */}
      <ul className="flex gap-6">

        <li>
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>
        </li>


        <li>
          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-600"
          >
            About
          </Link>
        </li>


        <li>
          <Link
            to="/services"
            className="text-gray-700 hover:text-blue-600"
          >
            Services
          </Link>
        </li>


        <li>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-600"
          >
            Contact
          </Link>
        </li>

      </ul>

    </nav>
  );
};

export default Navbar;