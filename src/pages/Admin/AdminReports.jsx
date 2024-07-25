import React from "react";
import AdminSideBar from "./AdminSideBar";
import AdminReportsContext from "../../contexts/Admin/AdminReportsContext";

function AdminReports() {
  return (
    <div>
      <AdminSideBar />
      <AdminReportsContext />
    </div>
  );
}

export default AdminReports;
