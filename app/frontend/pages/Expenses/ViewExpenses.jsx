import React, { useState } from "react";
import Layout from "../../components/Layout";
import DateFilter from "../../components/DateFilter";
import ExpenseViewToggle from "../../components/ExpenseViewToggle";
import CategorySummaryView from "../../components/CategorySummaryView";
import AllExpensesView from "../../components/AllExpensesView";
import { useExpenseData } from "../../hooks/useExpenseData";
import ExpensesOverview from "../../components/ExpensesOverview";
import "../../styles/theme.css";

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

  const { totalExpenses, remainingBudget, sortedTags } = useExpenseData(
    expenses,
    budget
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
      return (
        <p className="expense-list__empty">
          Add your first expense by clicking on "+ Add new" at the top of the
          page.
        </p>
      );
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
          <h2 className="page-title">Expenses</h2>
        </div>

        <div className="p-m">
          <DateFilter initialValue={dateFilter} />

          <ExpensesOverview
            totalExpenses={totalExpenses}
            budget={budget}
            remainingBudget={remainingBudget}
            dateFilter={dateFilter}
          />

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
