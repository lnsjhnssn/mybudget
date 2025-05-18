import React, { useState } from "react";
import { router } from "@inertiajs/react";

import "../../styles/expenses.css";
import DateFilter from "../../components/DateFilter";
import Layout from "../../components/Layout";

export default function ViewExpenses({ expenses, user, budget, dateFilter }) {
  const [editingExpense, setEditingExpense] = useState(null);
  const [editForm, setEditForm] = useState({
    place: "",
    date: "",
    amount: "",
  });

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
    setEditForm({
      place: expense.place,
      date: expense.date,
      amount: expense.amount,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    router.put(
      `/expenses/${editingExpense}`,
      {
        expense: editForm,
      },
      {
        onSuccess: () => {
          setEditingExpense(null);
          setEditForm({ place: "", date: "", amount: "" });
        },
      }
    );
  };

  const handleDelete = (expenseId) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      router.delete(`/expenses/${expenseId}`, {
        onSuccess: () => {},
      });
    }
  };

  return (
    <Layout>
      <main className="container-md bg-secondary">
        <div className="page-header">
          <h2 className="page-title">All Expenses</h2>
        </div>

        <div className="p-m">
          <DateFilter initialValue={dateFilter} />

          <div className="expense-list-overview">
            <div className="flex justify-between">
              <p>Total Expenses</p>
              <p className="expense-list__total">{totalExpenses.toFixed(2)}</p>
            </div>

            {budget && dateFilter === "this_month" && (
              <>
                <div className="flex justify-between">
                  <p>Monthly Budget</p>
                  <p className="expense-list__budget">
                    {budget.amount.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Remaining</p>
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
              </>
            )}
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
                        <form
                          onSubmit={handleUpdate}
                          className="expense-edit-form"
                        >
                          <input
                            type="text"
                            value={editForm.place}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                place: e.target.value,
                              })
                            }
                            placeholder="Place"
                            className="form-input"
                            required
                          />
                          <input
                            type="date"
                            value={editForm.date}
                            onChange={(e) =>
                              setEditForm({ ...editForm, date: e.target.value })
                            }
                            className="form-input"
                            required
                          />
                          <input
                            type="number"
                            step="0.01"
                            value={editForm.amount}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                amount: e.target.value,
                              })
                            }
                            placeholder="Amount"
                            className="form-input"
                            required
                          />
                          <div className="expense-edit-actions">
                            <button type="submit" className="btn-primary">
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingExpense(null)}
                              className="btn-link"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="expense-item__header">
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
                            <button
                              onClick={() => handleEdit(expense)}
                              className="btn-link"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(expense.id)}
                              className="btn-link"
                            >
                              Delete
                            </button>
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
      </main>
    </Layout>
  );
}
