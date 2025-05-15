import { Link } from "@inertiajs/react";
import Logout from "./Logout";
// import "../styles/expenses.css";

import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link href="/expenses/add" className="navbar__brand">
          MyBudget
        </Link>
        <div className="navbar__links">
          <Link href="/expenses/add" className="navbar__link">
            Add Expense
          </Link>
          <Link href="/expenses" className="navbar__link">
            View Expenses
          </Link>
          <Link href="/budget" className="navbar__link">
            Budget
          </Link>
          <Logout />
        </div>
      </div>
    </nav>
  );
}
