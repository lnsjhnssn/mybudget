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

    // Default for place
    const finalPlace =
      data.place.trim() === "" ? "Unknown Place" : data.place.trim();

    // Default for amount
    const rawAmount = data.amount.toString().trim(); // Ensure amount is treated as string for trimming
    let parsedAmount = parseFloat(rawAmount);
    const finalAmount =
      rawAmount === "" || isNaN(parsedAmount) ? 0 : parsedAmount;

    // Default for tags
    let finalTags;
    const trimmedTagsInput = data.tags.trim();
    if (trimmedTagsInput === "") {
      finalTags = ["Other"];
    } else {
      finalTags = trimmedTagsInput
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== ""); // Remove empty strings resulting from input like "tag1, , tag2"
      if (finalTags.length === 0) {
        // Handles cases like ", ," which result in an empty array after filtering
        finalTags = ["Other"];
      }
    }

    post("/expenses", {
      place: finalPlace,
      date: data.date, // Date already defaults to today in useForm
      amount: finalAmount,
      tags: finalTags,
      image: data.image, // Image can be null, no default needed
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
            <button
              type="submit"
              disabled={processing}
              className="btn-large btn-blue"
            >
              {processing ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </main>
    </Layout>
  );
}
