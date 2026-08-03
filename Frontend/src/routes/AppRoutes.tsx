


import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AdminLogin from "@/features/home/pages/AdminLogin";

import MainLayout from "../layouts/MainLayout";
import HomePage from "../features/home/pages/HomePage";
import ComplaintPage from"../features/ComplaintRegister/pages/ComplaintPage";
// import Dashboard from "@/features/dashboard/pages/Dashboard";
import ComplaintStatusCheck from"../features/ComplaintRegister/pages/ComplaintStatus";

export default function AppRoutes() {
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

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/onlinecomplaints" element={<ComplaintPage />} />
          <Route path="/complaint-status" element={<ComplaintStatusCheck />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}