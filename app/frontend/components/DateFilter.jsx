import { useState } from "react";
import { router } from "@inertiajs/react";
import "../styles/expenses.css";

export default function DateFilter() {
  const [dateFilter, setDateFilter] = useState("all");

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
    router.get(
      "/expenses",
      { date_filter: e.target.value },
      { preserveState: true }
    );
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
          <option value="all">All Time</option>
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
