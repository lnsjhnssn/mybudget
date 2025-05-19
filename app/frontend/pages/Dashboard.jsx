import { Link } from "@inertiajs/react";
import "../styles/expenses.css";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h1 className="dashboard__title">Welcome to MyBudget</h1>
        <p className="dashboard__description">
          Track your expenses and manage your budget effectively.
        </p>
      </div>
    </>
  );
}
