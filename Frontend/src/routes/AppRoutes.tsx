// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";

// import MainLayout from "../layouts/MainLayout";
// // import HomePage from "../features/home/pages/HomePage";
// import AdminLogin from "@/features/home/pages/AdminLogin";

// const MessagePage = () => {
//   return (
//     <div style={{ padding: "40px", textAlign: "center" }}>
//       <h2>Hello World!</h2>
//       <p>This is a test page.</p>
//     </div>
//   );
// };

// const AppRoutes = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route element={<MainLayout />}>
//           {/* <Route
//             path="/"
//             element={<HomePage />}
//           /> */}
//           {/* <Route
//             path="/message"
//             element={<MessagePage />}
//           /> */}

//            <Route
//             path="/AdminLogin"
//             element={<AdminLogin/>}
//           />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default AppRoutes;


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AdminLogin from "@/features/home/pages/AdminLogin";
// import Dashboard from "@/features/dashboard/pages/Dashboard"; //dashboard

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login Page */}
        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        {/* All Protected Pages */}
        <Route element={<MainLayout />}>
          {/* <Route
            path="/dashboard"
            element={<Dashboard />}
          /> */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;