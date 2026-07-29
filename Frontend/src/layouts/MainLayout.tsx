// import { Outlet } from "react-router-dom";
// import Header from "../components/layout/Header";
// import Footer from "../components/layout/Footer";

// const MainLayout = () => {
//   return (
//     <>
//       <Header />
//       <Outlet />
//       <Footer />
//     </>
//   );
// };

// export default MainLayout;

import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import NavBar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const MainLayout = () => {
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
};

export default MainLayout;