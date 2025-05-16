import React from "react";
import { router } from "@inertiajs/react";
import Logout from "./Logout";

export default function Footer() {
  const handleLogout = (e) => {
    e.preventDefault();
    router.post("/logout");
  };

  return (
    <footer className="footer">
      <div className="footer-container container-md">
        <div className="footer-content">
          <div>
            <p>Spark.</p>
            <p className="footer-copyright">
              © {new Date().getFullYear()} Spark. All rights reserved.
            </p>
          </div>

          <Logout />
        </div>
      </div>
    </footer>
  );
}
