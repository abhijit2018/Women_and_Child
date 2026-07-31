import { FaUser } from "react-icons/fa";

const AdminIdInput = () => {
  return (
    <div className="input-box">
      <FaUser />

      <input
        type="text"
        placeholder="Admin ID / Email"
      />
    </div>
  );
};

export default AdminIdInput;