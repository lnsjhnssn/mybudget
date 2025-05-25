import React from "react";
import ExpenseListItem from "./ExpenseListItem";

export default function AllExpensesView({
  sortedTags,
  expenses,
  editingExpense,
  onEditExpense,
  onCancelEdit,
  existingPlaces,
  existingTags,
}) {
  return (
    <div className="list-expenses">
      {sortedTags.map(([tagName, { total, expenses: groupExpenses }]) => (
        <div key={tagName} className="expense-tag-group">
          <div className="expense-tag-group__header">
            <p className="expense-tag-group__title">{tagName}</p>
            <span className="expense-tag-group__total">{total.toFixed(2)}</span>
          </div>
          <ul className="expense-tag-group__list">
            {groupExpenses.map((expense) => (
              <ExpenseListItem
                key={expense.id}
                expense={expense}
                isEditing={editingExpense === expense.id}
                onEdit={onEditExpense}
                onCancelEdit={onCancelEdit}
                existingPlaces={existingPlaces}
                existingTags={existingTags}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
