import React from "react";
import { router } from "@inertiajs/react";

export default function EditExpenseForm({ expense, onCancel }) {
  const [editForm, setEditForm] = React.useState({
    place: expense.place,
    date: expense.date,
    amount: expense.amount,
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    router.put(
      `/expenses/${expense.id}`,
      {
        expense: editForm,
      },
      {
        onSuccess: () => {
          onCancel();
        },
      }
    );
  };

  const handleDelete = (expenseId) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      router.delete(`/expenses/${expenseId}`, {
        onSuccess: () => {
          onCancel();
        },
      });
    }
  };

  return (
    <form onSubmit={handleUpdate} className="expense-edit-form">
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
        onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
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
          Save Changes
        </button>
      </div>
      <div className="expense-edit-actions__buttons">
        <button
          type="button"
          onClick={() => handleDelete(expense.id)}
          className="btn-link btn-secondary"
        >
          Delete this item
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-link btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
