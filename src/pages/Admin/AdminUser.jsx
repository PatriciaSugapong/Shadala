import React from "react";
import AdminSideBar from "./AdminSideBar";
import AdminUserContext from "../../contexts/Admin/AdminUserContext";

function AdminUser() {
  return (
    <div>
      <AdminSideBar />
      <AdminUserContext />
    </div>
  );
}

export default AdminUser;
