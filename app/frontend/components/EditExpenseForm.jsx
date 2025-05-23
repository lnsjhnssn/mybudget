import React, { useState } from "react";
import { router } from "@inertiajs/react";
import CreatableSelect from "react-select/creatable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datepicker.css";
import { customSelectStyles } from "../styles/selectStyles";

export default function EditExpenseForm({
  expense,
  onCancel,
  existingPlaces = [],
  existingTags = [],
}) {
  const [editForm, setEditForm] = useState({
    place: expense.place,
    date: new Date(expense.date), // Convert to Date object
    amount: parseFloat(expense.amount).toFixed(2),
    tags: expense.tags.map((tag) => tag.name).join(", "),
    imageFile: null,
  });

  // Transform existing data into react-select format
  const placeOptions = existingPlaces.map((place) => ({
    value: place,
    label: place,
  }));
  const tagOptions = existingTags.map((tag) => ({ value: tag, label: tag }));

  const handleUpdate = (e) => {
    e.preventDefault();

    const formattedTags = editForm.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const dataToSend = {
      _method: "PUT", // Spoof PUT method for robust file uploads with Inertia
      place: editForm.place,
      date: editForm.date.toISOString().split("T")[0],
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
        <DatePicker
          selected={editForm.date}
          onChange={(date) => setEditForm({ ...editForm, date: date })}
          className="custom-datepicker"
          dateFormat="MMMM d, yyyy"
          placeholderText="Select a date"
          maxDate={new Date()}
          showPopperArrow={false}
          todayButton="Today"
        />
      </div>
      <div className="form-field">
        <label htmlFor="place" className="form-label">
          Place
        </label>
        <CreatableSelect
          options={placeOptions}
          value={
            editForm.place
              ? { value: editForm.place, label: editForm.place }
              : null
          }
          onChange={(selectedOption) =>
            setEditForm({
              ...editForm,
              place: selectedOption?.value || "",
            })
          }
          placeholder="Market, Restaurant, etc."
          styles={customSelectStyles}
          isClearable
        />
      </div>

      <div className="form-field">
        <label htmlFor="tags" className="form-label">
          Category
        </label>
        <CreatableSelect
          options={tagOptions}
          value={
            editForm.tags
              ? { value: editForm.tags, label: editForm.tags }
              : null
          }
          onChange={(selectedOption) =>
            setEditForm({
              ...editForm,
              tags: selectedOption?.value || "",
            })
          }
          placeholder="Food, Transport, etc."
          styles={customSelectStyles}
          isClearable
        />
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
