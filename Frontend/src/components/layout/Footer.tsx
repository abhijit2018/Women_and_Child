const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">

      <div className="container-custom py-6 text-center">

        <p>
          © {new Date().getFullYear()} My Website.
          All Rights Reserved.
        </p>

      </div>

    </footer>
  );
};

export default Footer;