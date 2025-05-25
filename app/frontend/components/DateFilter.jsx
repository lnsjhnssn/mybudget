import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import "../styles/theme.css";

export default function DateFilter({ initialValue = "this_month" }) {
  const [dateFilter, setDateFilter] = useState(initialValue);

  useEffect(() => {
    setDateFilter(initialValue);
  }, [initialValue]);

  const handleDateFilterChange = (value) => {
    setDateFilter(value);
    router.get(
      "/expenses",
      { date_filter: value },
      {
        preserveState: true,
        preserveScroll: true,
      }
    );
  };

  const filterOptions = [
    { value: "today", label: "Today" },
    { value: "this_month", label: "This Month" },
    { value: "last_month", label: "Last Month" },
    { value: "last_3_months", label: "Last 3 Months" },
    { value: "last_6_months", label: "Last 6 Months" },
    { value: "all_time", label: "All Time" },
  ];

  return (
    <div className="date-filter">
      <div className="date-filter__label">Filter by Date:</div>
      <div className="date-filter__buttons">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleDateFilterChange(option.value)}
            className={`date-filter__button ${
              dateFilter === option.value ? "date-filter__button--active" : ""
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
