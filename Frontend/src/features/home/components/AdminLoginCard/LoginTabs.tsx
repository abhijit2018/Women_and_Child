interface LoginTabsProps {
  activeTab: "login" | "register";
  onTabChange: (tab: "login" | "register") => void;
}

const LoginTabs = ({
  activeTab,
  onTabChange,
}: LoginTabsProps) => {
  return (
    <div className="login-tabs">
      <button
        type="button"
        className={`login-tab ${
          activeTab === "login" ? "active" : ""
        }`}
        onClick={() => onTabChange("login")}
      >
        Login
      </button>

      <button
        type="button"
        className={`login-tab ${
          activeTab === "register" ? "active" : ""
        }`}
        onClick={() => onTabChange("register")}
      >
        Register
      </button>
    </div>
  );
};

export default LoginTabs;