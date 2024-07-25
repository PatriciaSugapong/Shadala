import React from "react";
import AdminSideBar from "./AdminSideBar";
import AdminComplaintsContext from "../../contexts/Admin/AdminComplaintsContext";
function AdminComplaints() {
  return (
    <div>
      <AdminSideBar />
      <AdminComplaintsContext />
    </div>
  );
}

export default AdminComplaints;
