import React from "react";
import AdminDashboardContext from "../../contexts/Admin/AdminDashboardContext";
import AdminSideBar from "./AdminSideBar";

function AdminDashboard() {
  return (
    <div>
      <AdminSideBar />
      <AdminDashboardContext />
    </div>
  );
}

export default AdminDashboard;
