import React from "react";
import ClientNavBar from "./CustomerNavBar";
import ComplaintContext from "../../contexts/Customer/ComplaintContext";
import Footer from "../../components/ui/Footer";
function ComplaintForm() {
  return (
    <div>
      <ClientNavBar />
      <div className="min-h-[80vh] font-Montserrat bg-gradient-to-b from-white via-white to-teal-200 pb-2">
        <div className="max-w-[1240px] mx-auto grid px-4 bg-blue">
          <ComplaintContext />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ComplaintForm;
