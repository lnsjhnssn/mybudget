import React from "react";
import EditExpenseForm from "./EditExpenseForm";

export default function ExpenseListItem({
  expense,
  isEditing,
  onEdit,
  onCancelEdit,
  existingPlaces,
  existingTags,
}) {
  return (
    <li key={expense.id} className="expense-item">
      {isEditing ? (
        <EditExpenseForm
          expense={expense}
          onCancel={onCancelEdit}
          existingPlaces={existingPlaces}
          existingTags={existingTags}
        />
      ) : (
        <div
          className="expense-item__header"
          onClick={() => onEdit(expense)}
          style={{ cursor: "pointer" }}
        >
          <div>
            <span className="expense-item__place">
              {expense.place || "N/A"}
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
  );
}
