import React from "react";
import Logout from "./Logout";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container container-md">
        <div className="footer-content">
          <div>
            <p className="footer-copyright">
              © {new Date().getFullYear()} Spara. All rights reserved.
            </p>
          </div>
          <Logout />
        </div>
      </div>
    </footer>
  );
}
