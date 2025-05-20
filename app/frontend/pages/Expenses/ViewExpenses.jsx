import React, { useState } from "react";
import "../../styles/theme.css";
import DateFilter from "../../components/DateFilter";
import Layout from "../../components/Layout";
import ExpenseViewToggle from "../../components/ExpenseViewToggle";
import CategorySummaryView from "../../components/CategorySummaryView";
import AllExpensesView from "../../components/AllExpensesView";

export default function ViewExpenses({
  expenses,
  user,
  budget,
  dateFilter,
  existingPlaces = [],
  existingTags = [],
}) {
  const [editingExpense, setEditingExpense] = useState(null);
  const [viewMode, setViewMode] = useState("summary");
  const [expandedCategoryInSummary, setExpandedCategoryInSummary] =
    useState(null);

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

  const handleViewModeChange = (newMode) => {
    setViewMode(newMode);
    setExpandedCategoryInSummary(null);
    setEditingExpense(null);
  };

  const handleCategoryClickInSummary = (categoryName) => {
    if (expandedCategoryInSummary === categoryName) {
      setExpandedCategoryInSummary(null);
    } else {
      setExpandedCategoryInSummary(categoryName);
    }
    setEditingExpense(null);
  };

  const renderExpenseContent = () => {
    if (!expenses || expenses.length === 0) {
      return <p className="expense-list__empty"></p>;
    }

    if (viewMode === "summary") {
      return (
        <CategorySummaryView
          sortedTags={sortedTags}
          expandedCategoryInSummary={expandedCategoryInSummary}
          onCategoryToggle={handleCategoryClickInSummary}
          editingExpense={editingExpense}
          onEditExpense={handleEdit}
          onCancelEdit={() => setEditingExpense(null)}
          existingPlaces={existingPlaces}
          existingTags={existingTags}
        />
      );
    }

    return (
      <AllExpensesView
        sortedTags={sortedTags}
        expenses={expenses}
        editingExpense={editingExpense}
        onEditExpense={handleEdit}
        onCancelEdit={() => setEditingExpense(null)}
        existingPlaces={existingPlaces}
        existingTags={existingTags}
      />
    );
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
          <ExpenseViewToggle
            currentView={viewMode}
            onViewChange={handleViewModeChange}
          />
          {renderExpenseContent()}
        </div>
      </main>
    </Layout>
  );
}
