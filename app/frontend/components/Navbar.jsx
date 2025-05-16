import { Link } from "@inertiajs/react";
import Logout from "./Logout";
import "../styles/expenses.css";
import logoSpark from "../assets/logo_spark.svg";

export default function Navbar() {
  return (
    <nav>
      <div className="navbar-container container-md">
        <Link href="/expenses/add" className="navbar__brand">
          <img src={logoSpark} alt="Spark" className="navbar__logo" />
        </Link>
        <div className="navbar__links">
          <Link href="/expenses/add" className="btn-link">
            + Add New
          </Link>
          <Link href="/expenses" className="btn-link">
            View All
          </Link>
          <Link href="/budget" className="btn-link">
            Set budget
          </Link>
        </div>
      </div>
    </nav>
  );
}
