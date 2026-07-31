import { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="input-box">
      <FaLock className="input-icon" />

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
      />

      <button
        type="button"
        className="password-toggle"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
};

export default PasswordInput;