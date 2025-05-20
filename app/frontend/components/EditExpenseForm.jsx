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
    amount: parseFloat(expense.amount).toFixed(2),
    tags: expense.tags.map((tag) => tag.name).join(", "),
    imageFile: null, // To store the new file object, if any
  });

  const handleUpdate = (e) => {
    e.preventDefault();

    const formattedTags = editForm.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const dataToSend = {
      _method: "PUT", // Spoof PUT method for robust file uploads with Inertia
      place: editForm.place,
      date: editForm.date,
      amount: editForm.amount,
      tags: formattedTags,
    };

    if (editForm.imageFile) {
      dataToSend.image = editForm.imageFile;
    } else {
    }

    router.post(`/expenses/${expense.id}`, dataToSend, {
      onSuccess: () => {
        onCancel(); // Close form on success
      },
      onError: (errors) => {
        console.error("Update failed:", errors);
      },
    });
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
      <button
        className="btn-close-edit"
        type="button"
        onClick={onCancel}
        aria-label="Close edit form"
      >
        &times;
      </button>
      <div className="form-field">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          id="amount"
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
      {/* Display current image if no new image is selected yet */}
      {expense.image_url && !editForm.imageFile && (
        <div className="form-field">
          <label className="form-label">Receipt</label>
          <img
            className="expense-edit-form__image"
            src={expense.image_url}
            alt="Current expense"
          />
        </div>
      )}
      {/* Display new image preview if a new image has been selected */}
      {editForm.imageFile && (
        <div className="form-field">
          <label className="form-label">New Receipt Preview</label>
          <img
            className="expense-edit-form__image"
            src={URL.createObjectURL(editForm.imageFile)}
            alt="New receipt preview"
          />
        </div>
      )}

      <div className="form-field">
        <label htmlFor="imageFile" className="form-label">
          {expense.image_url ? "Change Receipt" : "Add Receipt"}
        </label>
        <input
          type="file"
          id="imageFile"
          onChange={(e) =>
            setEditForm({ ...editForm, imageFile: e.target.files[0] })
          }
          className="form-input"
        />
        <label className="form-label">Delete this expense?</label>
        <button
          type="button"
          onClick={() => handleDelete(expense.id)}
          className="btn-border btn-small btn-delete"
        >
          Delete
        </button>
      </div>

      <div className="expense-edit-actions">
        <button type="submit" className="btn-large btn-green">
          Save Changes
        </button>
      </div>
      <div className="expense-edit-actions">
        <button type="button" onClick={onCancel} className="btn-grey btn-large">
          Cancel
        </button>
      </div>
    </form>
  );
}
