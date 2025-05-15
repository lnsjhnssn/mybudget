import React from "react";
import { Link } from "@inertiajs/react";
import Logout from "./Logout";
import "../styles/navigation.css";

export default function Navigation({ user }) {
  return (
    <nav className="navigation">
      <div className="navigation__brand">
        <Link href="/">MyBudget</Link>
      </div>

      <div className="navigation__links">
        {user ? (
          <>
            <Link href="/expenses" className="navigation__link">
              Expenses
            </Link>
            <Link href="/budget" className="navigation__link">
              Budget
            </Link>
            <Logout />
          </>
        ) : (
          <Link href="/login" className="navigation__link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
