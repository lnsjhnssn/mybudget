import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import "../styles/expenses.css";

export default function DateFilter({ initialValue = "this_month" }) {
  const [dateFilter, setDateFilter] = useState(initialValue);

  useEffect(() => {
    setDateFilter(initialValue);
  }, [initialValue]);

  const handleDateFilterChange = (e) => {
    const newValue = e.target.value;
    setDateFilter(newValue);
    router.get("/expenses", { date_filter: newValue }, { preserveState: true });
  };

  return (
    <div className="expense-list__filters">
      <div className="expense-list__filter-group">
        <label htmlFor="date-filter">Filter by Date:</label>
        <select
          id="date-filter"
          value={dateFilter}
          onChange={handleDateFilterChange}
          className="expense-list__select"
        >
          <option value="today">Today</option>
          <option value="this_month">This Month</option>
          <option value="last_30_days">Last 30 Days (Rolling)</option>
          <option value="last_month">Previous Month</option>
          <option value="last_3_months">Last 3 Months</option>
          <option value="last_6_months">Last 6 Months</option>
          <option value="this_year">This Year</option>
        </select>
      </div>
    </div>
  );
}
