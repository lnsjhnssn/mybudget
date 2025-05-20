import React from "react";

export default function ExpenseViewToggle({ currentView, onViewChange }) {
  return (
    <div className="date-filter__buttons expense-view-toggle-controls pt-xl">
      <button
        type="button"
        className={`date-filter__button ${
          currentView === "summary" ? "date-filter__button--active" : ""
        }`}
        onClick={() => onViewChange("summary")}
      >
        View categories
      </button>
      <button
        type="button"
        className={`date-filter__button ${
          currentView === "all" ? "date-filter__button--active" : ""
        }`}
        onClick={() => onViewChange("all")}
      >
        View all expenses
      </button>
    </div>
  );
}
