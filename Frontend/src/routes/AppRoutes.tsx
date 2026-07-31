// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";

// import MainLayout from "../layouts/MainLayout";
// import HomePage from "../features/home/pages/HomePage";
// import ComplaintPage from"../features/ComplaintRegister/pages/ComplaintPage";


// const AppRoutes = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route element={<MainLayout />}>
//           <Route
//             path="/"
//             element={<HomePage />}
//           />
//           <Route
//             path="/onlinecomplaints"
//             element={<ComplaintPage />}
//           />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default AppRoutes;


import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../features/home/pages/HomePage";
import ComplaintPage from"../features/ComplaintRegister/pages/ComplaintPage";

function AppContent() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/onlinecomplaints" element={<ComplaintPage />} />
      </Route>
    </Routes>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}