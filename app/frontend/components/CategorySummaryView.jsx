import React from "react";
import ExpenseListItem from "./ExpenseListItem";

export default function CategorySummaryView({
  sortedTags,
  expandedCategoryInSummary,
  onCategoryToggle,
  editingExpense,
  onEditExpense,
  onCancelEdit,
  existingPlaces,
  existingTags,
}) {
  if (sortedTags.length === 0) {
    return <p className="expense-list__empty"></p>;
  }

  return (
    <div className="list-expenses">
      {sortedTags.map(([tagName, { total, expenses: categoryExpenses }]) => (
        <div key={tagName} className="category-summary-item expense-tag-group">
          <div
            className="expense-tag-group__header clickable-header"
            onClick={() => onCategoryToggle(tagName)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onCategoryToggle(tagName);
              }
            }}
          >
            <p className="expense-tag-group__title">{tagName}</p>
            <span className="expense-tag-group__total">{total.toFixed(2)}</span>
          </div>
          {expandedCategoryInSummary === tagName && (
            <ul
              className="expense-tag-group__list"
              style={{ marginTop: "var(--space-xs)" }}
            >
              {categoryExpenses.length > 0 ? (
                categoryExpenses.map((expense) => (
                  <ExpenseListItem
                    key={expense.id}
                    expense={expense}
                    isEditing={editingExpense === expense.id}
                    onEdit={onEditExpense}
                    onCancelEdit={onCancelEdit}
                    existingPlaces={existingPlaces}
                    existingTags={existingTags}
                  />
                ))
              ) : (
                <li className="expense-item"></li>
              )}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
