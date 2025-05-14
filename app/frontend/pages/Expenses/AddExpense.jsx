import { useForm } from "@inertiajs/react";
import "../../styles/expenses.css";
import Navbar from "../../components/Navbar";

export default function AddExpense({ user }) {
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
          <p className="expense-form__welcome">Welcome, {user.email}</p>
        </div>
        <form onSubmit={handleSubmit} className="stack">
          <div className="expense-form__field">
            <input
              type="number"
              placeholder="Amount"
              value={data.amount}
              onChange={(e) => setData("amount", e.target.value)}
              className="expense-form__input"
            />
            {errors.amount && <div className="text-error">{errors.amount}</div>}
          </div>
          <div className="expense-form__field">
            <input
              type="text"
              placeholder="Place"
              value={data.place}
              onChange={(e) => setData("place", e.target.value)}
              className="expense-form__input"
            />
            {errors.place && <div className="text-error">{errors.place}</div>}
          </div>
          <div className="expense-form__field">
            <input
              type="date"
              value={data.date}
              onChange={(e) => setData("date", e.target.value)}
              className="expense-form__input"
            />
            {errors.date && <div className="text-error">{errors.date}</div>}
          </div>
          <div className="expense-form__field">
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={data.tags}
              onChange={(e) => setData("tags", e.target.value)}
              className="expense-form__input"
            />
            {errors.tags && <div className="text-error">{errors.tags}</div>}
          </div>
          <button
            type="submit"
            disabled={processing}
            className="expense-form__button"
          >
            {processing ? "Adding..." : "Add Expense"}
          </button>
        </form>
      </div>
    </>
  );
}
