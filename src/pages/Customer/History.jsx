import React from "react";
import ClientNavBar from "./CustomerNavBar";
import HistoryContext from "../../contexts/Customer/HistoryContext";
import Footer from "../../components/ui/Footer";
function history() {
  return (
    <div>
      <ClientNavBar />
      <div className="min-h-[80vh] font-Montserrat bg-gradient-to-b from-white via-white to-teal-200 pb-2">
        <div className="max-w-[1240px] mx-auto grid px-4 bg-blue">
          <HistoryContext />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default history;
