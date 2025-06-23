import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import "../styles/theme.css";
import Logo from "@/assets/v.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    router.delete("/logout", {
      preserveScroll: true,
      onSuccess: () => {
        router.visit("/");
      },
    });
  };

  return (
    <nav>
      <div className="navbar-container container-md">
        <Link href="/expenses/add" className="navbar__brand">
          <div className="navbar-logo-container">
            <h1>Spara</h1>
            <img src={Logo} alt="Spark" className="logo" />
          </div>
        </Link>
        {/* Mobile menu button and Add Expense link */}
        <div className="mobile-nav">
          <Link
            href="/expenses/add"
            className="navbar-link add-new mobile-add-new"
          >
            + Add New
          </Link>
          <button
            className={`mobile-menu-button ${isMenuOpen ? "is-active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Desktop menu */}
        <div className="navbar__links">
          <Link href="/expenses/add" className="navbar-link add-new">
            + Add New
          </Link>
          <Link href="/expenses" className="navbar-link">
            Expenses
          </Link>
          <Link href="/budget" className="navbar-link">
            Set budget
          </Link>
        </div>

        {/* Mobile menu overlay */}
        <div className={`mobile-menu ${isMenuOpen ? "is-active" : ""}`}>
          <div className="mobile-menu__content">
            <Link
              href="/expenses/add"
              className="mobile-menu__link"
              onClick={() => setIsMenuOpen(false)}
            >
              Add New
            </Link>
            <Link
              href="/expenses"
              className="mobile-menu__link"
              onClick={() => setIsMenuOpen(false)}
            >
              Expenses
            </Link>
            <Link
              href="/budget"
              className="mobile-menu__link"
              onClick={() => setIsMenuOpen(false)}
            >
              Set budget
            </Link>
            <button onClick={handleLogout} className="mobile-menu__link">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
