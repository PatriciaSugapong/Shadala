import React from "react";
import AdminBookingContext from "../../contexts/Admin/AdminBookingContext";
import AdminSideBar from "./AdminSideBar";
function AdmingBooking() {
  return (
    <div>
      <AdminSideBar />
      <AdminBookingContext />
    </div>
  );
}

export default AdmingBooking;
