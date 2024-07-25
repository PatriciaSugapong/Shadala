// Index.js

import React from "react";
import Hero from "./Hero";
import Banner from "./HomeBanner";
import Content from "./HomeContent";
import Navbar from "./HomeNavBar";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import "../../index.css";

export default function Index({ loading }) {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="scroll-smooth">
      {loading ? (
        <LoadingSpinner color="#36d7b7" />
      ) : (
        <div>
          <Navbar scrollToSection={scrollToSection} />
          <Hero />
          <Banner />
          <Content />
        </div>
      )}
    </div>
  );
}
