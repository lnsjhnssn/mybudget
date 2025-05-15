import { useForm } from "@inertiajs/react";
import "../../styles/expenses.css";
import Navbar from "../../components/Navbar";

export default function AddExpense({
  user,
  existingPlaces = [],
  existingTags = [],
}) {
  const today = new Date().toISOString().split("T")[0]; // Gets today's date in YYYY-MM-DD format

  const { data, setData, post, processing, errors } = useForm({
    place: "",
    date: today,
    amount: "",
    tags: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagArray = data.tags.split(",").map((t) => t.trim());
    post("/expenses", { data: { ...data, tags: tagArray } });
  };

  return (
    <>
      <Navbar />
      <div className="expense-form">
        <div className="expense-form__header">
          <h2 className="expense-form__title">Add New Expense</h2>
        </div>
        <form onSubmit={handleSubmit} className="stack">
          <div className="expense-form__field">
            <label htmlFor="amount" className="expense-form__label">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              placeholder="10"
              value={data.amount}
              onChange={(e) => setData("amount", e.target.value)}
              className="expense-form__input"
            />
            {errors.amount && <div className="text-error">{errors.amount}</div>}
          </div>
          <div className="expense-form__field">
            <label htmlFor="date" className="expense-form__label">
              Date
            </label>
            <input
              id="date"
              type="date"
              value={data.date}
              onChange={(e) => setData("date", e.target.value)}
              className="expense-form__input"
            />
            {errors.date && <div className="text-error">{errors.date}</div>}
          </div>

          <div className="expense-form__field">
            <label htmlFor="place" className="expense-form__label">
              Place
            </label>
            <input
              id="place"
              type="text"
              list="places"
              placeholder="Market, Restaurant, etc."
              value={data.place}
              onChange={(e) => setData("place", e.target.value)}
              className="expense-form__input"
            />
            <datalist id="places">
              {existingPlaces.map((place) => (
                <option key={place} value={place} />
              ))}
            </datalist>
            {errors.place && <div className="text-error">{errors.place}</div>}
          </div>
          <div className="expense-form__field">
            <label htmlFor="tags" className="expense-form__label">
              Category
            </label>
            <input
              id="tags"
              type="text"
              list="categories"
              placeholder="Category"
              value={data.tags}
              onChange={(e) => setData("tags", e.target.value)}
              className="expense-form__input"
            />
            <datalist id="categories">
              {existingTags.map((tag) => (
                <option key={tag} value={tag} />
              ))}
            </datalist>
            {errors.tags && <div className="text-error">{errors.tags}</div>}
          </div>
          <button
            type="submit"
            disabled={processing}
            className="expense-form__button"
          >
            {processing ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </>
  );
}
