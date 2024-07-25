import React from "react";
import AdminSideBar from "./AdminSideBar";
import AdminDriversContext from "../../contexts/Admin/AdminDriversContext";

function AdminDriver() {
  return (
    <div>
      <AdminSideBar />
      <AdminDriversContext />
    </div>
  );
}

export default AdminDriver;
