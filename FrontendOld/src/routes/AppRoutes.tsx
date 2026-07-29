import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import RegisterForm from '../pages/RegisterForm/RegisterForm';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/get-support" element={<RegisterForm />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default AppRoutes;
