import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function AddExpense({ existingPlaces = [], existingTags = [] }) {
  const [tags, setTags] = useState([]);
  const { data, setData, post, processing, errors, reset } = useForm({
    expense: {
      place: "",
      date: new Date().toISOString().split("T")[0],
      amount: "",
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Format tags before submission
    const formattedTags = tags.map((tag) => tag.trim());
    post("/expenses", {
      expense: data.expense,
      tags: formattedTags,
      onSuccess: () => {
        reset();
        setTags([]);
      },
    });
  };

  const handleTagInput = (e) => {
    const value = e.target.value;
    if (value.includes(",")) {
      const newTags = value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
      setTags([...tags, ...newTags]);
      e.target.value = "";
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="stack">
        <h2>Add Expense</h2>

        {errors.expense?.place && (
          <div className="text-error">{errors.expense.place}</div>
        )}
        {errors.expense?.date && (
          <div className="text-error">{errors.expense.date}</div>
        )}
        {errors.expense?.amount && (
          <div className="text-error">{errors.expense.amount}</div>
        )}
        {errors.tags && <div className="text-error">{errors.tags}</div>}

        <label htmlFor="place" className="form-label">
          Place
        </label>
        <input
          type="text"
          list="places"
          value={data.expense.place}
          onChange={(e) => setData("expense.place", e.target.value)}
          placeholder="Place"
          required
          className="form-input"
        />
        <datalist id="places">
          {existingPlaces.map((place) => (
            <option key={place} value={place} />
          ))}
        </datalist>

        <label htmlFor="date" className="form-label">
          Date
        </label>
        <input
          type="date"
          value={data.expense.date}
          onChange={(e) => setData("expense.date", e.target.value)}
          required
          className="form-input"
        />

        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          type="number"
          step="0.01"
          value={data.expense.amount}
          onChange={(e) => setData("expense.amount", e.target.value)}
          placeholder="Amount"
          required
          className="form-input"
        />

        <label htmlFor="tags" className="form-label">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          list="tags"
          onKeyUp={handleTagInput}
          placeholder="Add tags (press comma to add)"
          className="form-input"
        />
        <datalist id="tags">
          {existingTags.map((tag) => (
            <option key={tag} value={tag} />
          ))}
        </datalist>

        <div className="cluster">
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="tag-remove"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <button type="submit" disabled={processing} className="btn-primary">
          {processing ? "Adding..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
}
