import { useForm } from "@inertiajs/react";
import "../../styles/theme.css";
import Layout from "../../components/Layout";

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
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagArray = data.tags.split(",").map((t) => t.trim());
    post("/expenses", {
      place: data.place,
      date: data.date,
      amount: data.amount,
      tags: tagArray,
      image: data.image,
    });
  };

  return (
    <Layout>
      <main className="container-sm bg-secondary">
        <div className="page-header">
          <h2 className="page-title">Add New Expense</h2>
        </div>
        <div className="p-m">
          <form onSubmit={handleSubmit} className="stack">
            <div className="form-field">
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <input
                id="amount"
                type="number"
                placeholder="10"
                value={data.amount}
                onChange={(e) => setData("amount", e.target.value)}
                className="form-input"
              />
              {errors.amount && (
                <div className="text-error">{errors.amount}</div>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                id="date"
                type="date"
                value={data.date}
                onChange={(e) => setData("date", e.target.value)}
                className="form-input"
              />
              {errors.date && <div className="text-error">{errors.date}</div>}
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
                value={data.place}
                onChange={(e) => setData("place", e.target.value)}
                className="form-input"
              />
              <datalist id="places">
                {existingPlaces.map((place) => (
                  <option key={place} value={place} />
                ))}
              </datalist>
              {errors.place && <div className="text-error">{errors.place}</div>}
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
                value={data.tags}
                onChange={(e) => setData("tags", e.target.value)}
                className="form-input"
              />
              <datalist id="categories">
                {existingTags.map((tag) => (
                  <option key={tag} value={tag} />
                ))}
              </datalist>
              {errors.tags && <div className="text-error">{errors.tags}</div>}
            </div>
            <div className="form-field">
              <label htmlFor="image" className="form-label">
                Add Receipt
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={(e) => setData("image", e.target.files[0])}
                className="form-input"
              />
              {errors.image && <div className="text-error">{errors.image}</div>}
            </div>
            <button type="submit" disabled={processing} className="btn-primary">
              {processing ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </main>
    </Layout>
  );
}
