import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import HomePage from "../features/home/pages/HomePage";

const MessagePage = () => {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Hello World!</h2>
      <p>This is a test page.</p>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/message"
            element={<MessagePage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;