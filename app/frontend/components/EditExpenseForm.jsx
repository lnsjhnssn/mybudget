import React from "react";
import { router } from "@inertiajs/react";

export default function EditExpenseForm({
  expense,
  onCancel,
  existingPlaces = [],
  existingTags = [],
}) {
  const [editForm, setEditForm] = React.useState({
    place: expense.place,
    date: expense.date,
    amount: expense.amount,
    tags: expense.tags.map((tag) => tag.name).join(", "),
  });

  const handleUpdate = (e) => {
    e.preventDefault();

    // Format tags: split by comma, trim whitespace, and filter out empty strings
    const formattedTags = editForm.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    console.log("Sending update with data:", {
      place: editForm.place,
      date: editForm.date,
      amount: editForm.amount,
      tags: formattedTags,
    });

    router.put(
      `/expenses/${expense.id}`,
      {
        expense: {
          place: editForm.place,
          date: editForm.date,
          amount: editForm.amount,
          tags: formattedTags,
        },
      },
      {
        onSuccess: () => {
          console.log("Update successful");
          onCancel();
        },
        onError: (errors) => {
          console.error("Update failed:", errors);
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
      <div className="form-field">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          step="0.01"
          value={parseFloat(editForm.amount).toFixed(2)}
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
      </div>
      <div className="form-field">
        <label htmlFor="date" className="form-label">
          Date
        </label>
        <input
          id="date"
          type="date"
          value={editForm.date}
          onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
          className="form-input"
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="place" className="form-label">
          Place
        </label>
        <input
          id="place"
          type="text"
          list="places"
          placeholder="Market, Restaurant, etc."
          value={editForm.place}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              place: e.target.value,
            })
          }
          className="form-input"
          required
        />
        <datalist id="places">
          {existingPlaces.map((place) => (
            <option key={place} value={place} />
          ))}
        </datalist>
      </div>

      <div className="form-field">
        <label htmlFor="tags" className="form-label">
          Category
        </label>
        <input
          id="tags"
          type="text"
          list="categories"
          placeholder="Food, Transport, etc."
          value={editForm.tags}
          onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
          className="form-input"
        />
        <datalist id="categories">
          {existingTags.map((tag) => (
            <option key={tag} value={tag} />
          ))}
        </datalist>
      </div>

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
