

import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from "../components/layout/Header";
import NavBar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function MainLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;