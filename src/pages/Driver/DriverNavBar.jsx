import React, { useState } from "react";
import { LiaBoxSolid, LiaIdCardSolid } from "react-icons/lia";
import { VscSignOut, VscHistory } from "react-icons/vsc";
import { RiCustomerService2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ConfirmSignoutModal from "../../components/ui/ConfirmSignoutModal";

function DriverNavBar({ onComponentChange }) {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSignOut = () => {
    setShowConfirmation(true);
  };

  const confirmSignOut = () => {
    sessionStorage.removeItem("user");
    navigate("/ph-en");
  };

  const cancelSignOut = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      {showConfirmation && (
        <ConfirmSignoutModal
          confirmSignOut={confirmSignOut}
          cancelSignOut={cancelSignOut}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex w-full items-center justify-between h-20">
          <Link to="/driver">
            <button className="text-gray-900 flex flex-col items-center px-3 py-2 text-sm font-medium hover:text-teal-800 focus:text-teal-800 focus:bg-slate-100 focus:scale-110 focus:font-bold">
              <LiaBoxSolid size={35} />
              <span className="mt-1">Pickup</span>
            </button>
          </Link>
          <Link to="/driver/history">
            <button className="text-gray-900 flex flex-col items-center px-3 py-2 text-sm font-medium hover:text-teal-800 focus:text-teal-800 focus:bg-slate-100 focus:scale-110 focus:font-bold">
              <VscHistory size={35} />
              <span className="mt-1">History</span>
            </button>
          </Link>
          <Link to="/driver/profile">
            <button className="text-gray-900 flex flex-col items-center px-3 py-2 text-sm font-medium hover:text-teal-800 focus:text-teal-800 focus:bg-slate-100 focus:scale-110 focus:font-bold">
              <LiaIdCardSolid size={35} />
              <span className="mt-1">Profile</span>
            </button>
          </Link>
          <Link to="/driver/support">
            <button className="text-gray-900 flex flex-col items-center px-3 py-2 text-sm font-medium hover:text-teal-800 focus:text-teal-800 focus:bg-slate-100 focus:scale-110 focus:font-bold">
              <RiCustomerService2Line size={35} />
              <span className="mt-1">Support</span>
            </button>
          </Link>
          <button
            className="text-gray-900 flex flex-col items-center px-3 py-2 text-sm font-medium hover:text-teal-800 focus:text-teal-800 focus:bg-slate-100 focus:scale-110 focus:font-bold"
            onClick={handleSignOut}
          >
            <VscSignOut size={35} />
            <span className="mt-1">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DriverNavBar;
