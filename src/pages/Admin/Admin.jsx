import React from "react";
import AdminSideBar from "./AdminSideBar";
import AdminDashboardContext from "../../contexts/Admin/AdminDashboardContext";

function Admin() {
  return (
    <div>
      <AdminSideBar />
      <AdminDashboardContext />
    </div>
  );
}

export default Admin;
