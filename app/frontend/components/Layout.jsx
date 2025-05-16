import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="page-wrapper">
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
