import React from "react";
import { router } from "@inertiajs/react";
import "../../styles/expenses.css";
import "../../styles/base.css";
import Navbar from "../../components/Navbar";
import DateFilter from "../../components/DateFilter";

export default function ViewExpenses({ expenses, user, budget, dateFilter }) {
  // Calculate total of all expenses
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );

  // Calculate remaining budget
  const remainingBudget = budget ? budget.amount - totalExpenses : 0;
  const budgetPercentage = budget ? (totalExpenses / budget.amount) * 100 : 0;

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

  // Sort tags by total amount (descending)
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

        <DateFilter initialValue={dateFilter} />

        <div className="expense-list__summary">
          <div className="expense-list__summary-section">
            <h3>Total Expenses</h3>
            <p className="expense-list__total">{totalExpenses.toFixed(2)}</p>
          </div>

          {budget && dateFilter === "this_month" && (
            <>
              <div className="expense-list__summary-section">
                <h3>Monthly Budget</h3>
                <p className="expense-list__budget">
                  {budget.amount.toFixed(2)}
                </p>
              </div>
              <div className="expense-list__summary-section">
                <h3>Remaining Budget</h3>
                <p
                  className={`expense-list__remaining ${
                    remainingBudget < 0
                      ? "expense-list__remaining--negative"
                      : ""
                  }`}
                >
                  {remainingBudget.toFixed(2)}
                </p>
              </div>
              <div className="expense-list__progress">
                <div
                  className="expense-list__progress-bar"
                  style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                />
                <span className="expense-list__progress-text">
                  {budgetPercentage.toFixed(1)}% of budget used
                </span>
              </div>
            </>
          )}
        </div>

        <div className="expense-list__tags">
          {sortedTags.map(([tagName, { total, expenses }]) => (
            <div key={tagName} className="expense-tag-group">
              <div className="expense-tag-group__header">
                <h3 className="expense-tag-group__title">{tagName}</h3>
                <span className="expense-tag-group__total">
                  {total.toFixed(2)}
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
                          {new Date(expense.date).toLocaleDateString()}
                        </span>
                      </div>
                      <span className="expense-item__amount">
                        {parseFloat(expense.amount).toFixed(2)}
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
