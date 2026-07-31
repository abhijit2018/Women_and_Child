import { useState } from "react";

import "@/styles/LoginCard.css";

import LoginTabs from "./LoginTabs";
import AdminIdInput from "./AdminIdInput";
import PasswordInput from "./PasswordInput";
import CaptchaSection from "./CaptchaSection";
import RememberMe from "./RememberMe";
import ForgotPassword from "./ForgotPassword";
import LoginButton from "./LoginButton";
import OTPButton from "./OTPButton";


const LoginCard = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div className="login-card">
      {/* Logo */}
      {/* <Logo /> */}

      {/* Heading */}
      <h1 className="login-title">Welcome Back!</h1>

      <p className="login-subtitle">
        Login to your NCW Admin Portal
      </p>

      {/* Login / Register Tabs */}
      <LoginTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Login Form */}
      {activeTab === "login" && (
        <>
          <AdminIdInput />

          <PasswordInput />

          {/* <CaptchaSection /> */}

          <div className="login-options">
            <RememberMe />
            <ForgotPassword />
          </div>

          <LoginButton />

          <div className="divider">
            <span>OR</span>
          </div>

          <OTPButton />
        </>
      )}

      {/* Register Form */}
      {activeTab === "register" && (
        <div className="register-placeholder">
          <h3>Register</h3>
          <p>Registration form will be added here.</p>
        </div>
      )}
    </div>
  );
};

export default LoginCard;