import React from "react";
import Signin from "./pages/Login/Signin";
import UserTypeSelection from "./pages/Signup/UserTypeSelection";
import { Route, Routes, Navigate } from "react-router-dom";
import Index from "./pages/Home/Index";
import Footer from "./components/ui/Footer";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import Book from "./pages/Customer/Book";
import History from "./pages/Customer/History";
import ComplaintForm from "./pages/Customer/Complaint";
import ForgotPassword from "./pages/ForgotPassword/Forgot-pass";
import PassVerifyCode from "./pages/ForgotPassword/PassVerifyCode";
import NewPassword from "./pages/ForgotPassword/NewPassword";
import SignUpAsDriver from "./pages/Signup/SignUpAsDriver";
import SignUpAsCustomer from "./pages/Signup/SignUpAsCustomer";
import Admin from "./pages/Admin/Admin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminBookings from "./pages/Admin/AdminBooking";
import AdminDrivers from "./pages/Admin/AdminDrivers";
import AdminComplaints from "./pages/Admin/AdminComplaints";
import AdminReports from "./pages/Admin/AdminReports";
import AdminUser from "./pages/Admin/AdminUser";
import Driver from "./pages/Driver/Driver";
import DriverHistory from "./pages/Driver/DriverHistory";
import DriverProfile from "./pages/Driver/DriverProfile";
import DriverSupport from "./pages/Driver/DriverSupport";

function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
         <Routes>
        <Route path="/shadala" element={<Navigate to="/ph-en" replace />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<UserTypeSelection />} />
        <Route path="/signup/customer" element={<SignUpAsCustomer />} />
        <Route path="/signup/driver" element={<SignUpAsDriver />} />
        <Route path="/ph-en" element={<Index />} />
        <Route path="/book" element={<Book />} />
        <Route path="/history" element={<History />} />
        <Route path="/complaint" element={<ComplaintForm />} />
        <Route path="/forgot-pass" element={<ForgotPassword />} />
        <Route
          path="/forgot-pass/verification-code"
          element={<PassVerifyCode />}
        />
        <Route path="/forgot-pass/new-password" element={<NewPassword />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-bookings" element={<AdminBookings />} />
        <Route path="/admin/manage-drivers" element={<AdminDrivers />} />
        <Route path="/admin/manage-complaints" element={<AdminComplaints />} />
        <Route path="/admin/analytics" element={<AdminReports />} />
        <Route path="/super-admin/manage-users" element={<AdminUser />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="/driver/history" element={<DriverHistory />} />
        <Route path="/driver/profile" element={<DriverProfile />} />
        <Route path="/driver/support" element={<DriverSupport />} />

      </Routes>
      {loading && <LoadingSpinner color="#36d7b7" />}
      {/* {!loading && <Footer />} */}
      
    </div>
  );
}

export default App;
