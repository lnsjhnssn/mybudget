import { useState } from "react";
import { router } from "@inertiajs/react";
import "../../styles/expenses.css";
import Navbar from "../../components/Navbar";
import DateFilter from "../../components/DateFilter";

export default function ViewExpenses({ expenses, user }) {
  const [dateFilter, setDateFilter] = useState("all");

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
    router.get(
      "/expenses",
      { date_filter: e.target.value },
      { preserveState: true }
    );
  };

  // Calculate total of all expenses
  const total = expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );

  // Group expenses by tags
  const expensesByTag = expenses.reduce((acc, expense) => {
    expense.tags.forEach((tag) => {
      if (!acc[tag.name]) {
        acc[tag.name] = {
          total: 0,
          expenses: [],
        };
      }
      acc[tag.name].total += parseFloat(expense.amount);
      acc[tag.name].expenses.push(expense);
    });
    return acc;
  }, {});

  // Sort tags by total amount (highest to lowest)
  const sortedTags = Object.entries(expensesByTag).sort(
    ([, a], [, b]) => b.total - a.total
  );

  return (
    <>
      <Navbar />
      <div className="expense-list">
        <div className="expense-list__header">
          <h2 className="expense-list__title">All Expenses</h2>
          <p className="expense-list__welcome">Welcome, {user.email}</p>
        </div>

        <DateFilter />

        <div className="expense-list__summary">
          <h3>Total Expenses</h3>
          <p className="expense-list__total">€{total.toFixed(2)}</p>
        </div>

        <div className="expense-list__tags">
          {sortedTags.map(([tagName, { total, expenses }]) => (
            <div key={tagName} className="expense-tag-group">
              <div className="expense-tag-group__header">
                <h3 className="expense-tag-group__title">{tagName}</h3>
                <span className="expense-tag-group__total">
                  €{total.toFixed(2)}
                </span>
              </div>
              <ul className="expense-tag-group__list">
                {expenses.map((expense) => (
                  <li key={expense.id} className="expense-item">
                    <div className="expense-item__header">
                      <div>
                        <span className="expense-item__place">
                          {expense.place}
                        </span>
                        <span className="expense-item__date">
                          {expense.date}
                        </span>
                      </div>
                      <span className="expense-item__amount">
                        €{expense.amount}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
