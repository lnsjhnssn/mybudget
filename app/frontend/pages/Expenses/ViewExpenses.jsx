import React, { useState } from "react";
import { router } from "@inertiajs/react";

import "../../styles/theme.css";
import DateFilter from "../../components/DateFilter";
import Layout from "../../components/Layout";
import EditExpenseForm from "../../components/EditExpenseForm";
import Navbar from "../../components/Navbar";

export default function ViewExpenses({
  expenses,
  user,
  budget,
  dateFilter,
  existingPlaces = [],
  existingTags = [],
}) {
  const [editingExpense, setEditingExpense] = useState(null);

  // Calculate total of all expenses
  const totalExpenses =
    expenses?.reduce((sum, expense) => {
      const amount = parseFloat(expense?.amount);
      if (isNaN(amount)) {
        console.warn("Invalid amount found:", expense);
        return sum;
      }
      return sum + amount;
    }, 0) || 0;

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

  const handleEdit = (expense) => {
    setEditingExpense(expense.id);
  };

  return (
    <div className="container-md">
      <Navbar user={user} />
      <h1 className="page-title">Expenses</h1>
      <DateFilter dateFilter={dateFilter} />
      <div className="expense-list-overview">
        <div className="flex justify-between">
          <div>Total: ${totalExpenses.toFixed(2)}</div>
          {budget && (
            <>
              <div>Budget: ${budget.amount.toFixed(2)}</div>
              <div
                className={
                  remainingBudget >= 0
                    ? "expense-list__remaining"
                    : "expense-list__remaining--negative"
                }
              >
                Remaining: ${remainingBudget.toFixed(2)}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="list-expenses">
        {sortedTags.map(([tagName, { total, expenses }]) => (
          <div key={tagName} className="expense-tag-group">
            <div className="expense-tag-group__header">
              <p className="expense-tag-group__title">{tagName}</p>
              <span className="expense-tag-group__total">
                {total.toFixed(2)}
              </span>
            </div>
            <ul className="expense-tag-group__list">
              {expenses.map((expense) => (
                <li key={expense.id} className="expense-item">
                  {editingExpense === expense.id ? (
                    <EditExpenseForm
                      expense={expense}
                      onCancel={() => setEditingExpense(null)}
                      existingPlaces={existingPlaces}
                      existingTags={existingTags}
                    />
                  ) : (
                    <div
                      className="expense-item__header"
                      onClick={() => handleEdit(expense)}
                      style={{ cursor: "pointer" }}
                    >
                      <div>
                        <span className="expense-item__place">
                          {expense.place}
                        </span>
                        <span className="expense-item__date">
                          {new Date(expense.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="expense-item__actions">
                        <span className="expense-item__amount">
                          {parseFloat(expense.amount).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
