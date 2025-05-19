import React, { useState } from "react";
import "../../styles/theme.css";
import DateFilter from "../../components/DateFilter";
import Layout from "../../components/Layout";
import EditExpenseForm from "../../components/EditExpenseForm";

export default function ViewExpenses({
  expenses,
  user,
  budget,
  dateFilter,
  existingPlaces = [],
  existingTags = [],
}) {
  console.log(
    "Expenses data received by ViewExpenses:",
    JSON.stringify(expenses, null, 2)
  );
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
      </main>
    </Layout>
  );
}
