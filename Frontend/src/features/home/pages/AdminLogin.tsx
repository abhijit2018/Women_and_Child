// import "@/styles/AdminLogin.css";

// import LeftPanel from "../components/LeftPanel";
// // import LoginCard from "../components/LoginCard";
// // import Footer from "../components/Footer";

// const AdminLogin = () => {
//   return (
//     <div
//       className="admin-login"
//       style={{
//         backgroundImage: "url('/images/adminBack.png')",
//       }}
//     >
//       {/* Overlay */}
//       <div className="login-overlay">
//         {/* Main Content */}
//         <div className="login-wrapper">
//           {/* Left Section */}
//           <div className="login-left">
//             <LeftPanel />
//           </div>

//           {/* Right Section */}
//           <div className="login-right">
//             {/* <LoginCard /> */}
//           </div>
//         </div>

//         {/* Footer / Helpline */}
//         {/* <Footer /> */}
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;



import "@/styles/AdminLogin.css";

import LeftPanel from "../components/LeftPanel";
import LoginCard from "../components/AdminLoginCard/LoginCard";
// import Footer from "../components/Footer";

const AdminLogin = () => {
  return (
    <div
      className="admin-login"
      style={{
        backgroundImage: "url('/images/adminBack.png')",
      }}
    >
      {/* Background Overlay */}
      <div className="login-overlay">

        {/* Main Container */}
        <div className="login-wrapper">

          {/* Left Side */}
          <div className="login-left">
            <LeftPanel />
          </div>

          {/* Right Side */}
          <div className="login-right">
            <LoginCard />
          </div>

        </div>

        {/* Footer */}
        {/* <Footer /> */}

      </div>
    </div>
  );
};

export default AdminLogin;