import { useForm } from "@inertiajs/react";
import "../../styles/theme.css";
import "../../styles/datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import DatePicker from "react-datepicker";
import { customSelectStyles } from "../../styles/selectStyles";

export default function AddExpense({
  user,
  existingPlaces = [],
  existingTags = [],
}) {
  const today = new Date(); // Use Date object instead of string

  const { data, setData, post, processing, errors } = useForm({
    place: "",
    date: today, // Store as Date object
    amount: "",
    tags: "",
    image: null,
  });

  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  // Transform existing data into react-select format
  const placeOptions = existingPlaces.map((place) => ({
    value: place,
    label: place,
  }));
  const tagOptions = existingTags.map((tag) => ({ value: tag, label: tag }));

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

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
        .filter((t) => t !== "");
      if (finalTags.length === 0) {
        finalTags = ["Other"];
      }
    }

    // Convert date to YYYY-MM-DD format for backend
    const finalDate =
      data.date instanceof Date
        ? data.date.toISOString().split("T")[0]
        : data.date;

    post("/expenses", {
      place: finalPlace,
      date: finalDate,
      amount: finalAmount,
      tags: finalTags,
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
              <DatePicker
                selected={data.date}
                onChange={(date) => setData("date", date)}
                className="custom-datepicker"
                dateFormat="MMMM d, yyyy"
                placeholderText="Select a date"
                maxDate={new Date()}
                showPopperArrow={false}
                todayButton="Today"
              />
              {errors.date && <div className="text-error">{errors.date}</div>}
            </div>

            <div className="form-field">
              <label htmlFor="place" className="form-label">
                Place
              </label>
              <CreatableSelect
                options={placeOptions}
                value={
                  data.place ? { value: data.place, label: data.place } : null
                }
                onChange={(selectedOption) =>
                  setData("place", selectedOption?.value || "")
                }
                placeholder="Select or enter a place"
                styles={customSelectStyles}
                isClearable
              />
              {errors.place && <div className="text-error">{errors.place}</div>}
            </div>
            <div className="form-field">
              <label htmlFor="tags" className="form-label">
                Category
              </label>
              <CreatableSelect
                options={tagOptions}
                value={
                  data.tags ? { value: data.tags, label: data.tags } : null
                }
                onChange={(selectedOption) =>
                  setData("tags", selectedOption?.value || "")
                }
                placeholder="Select or enter a category"
                styles={customSelectStyles}
                isClearable
              />
              {errors.tags && <div className="text-error">{errors.tags}</div>}
            </div>
            <div className="form-field">
              <label htmlFor="image" className="form-label">
                Receipt
              </label>
              {imagePreviewUrl && (
                <div style={{ marginBottom: "10px" }}>
                  <img
                    src={imagePreviewUrl}
                    alt="Receipt Preview"
                    className="expense-edit-form__image"
                  />
                </div>
              )}
              <input
                type="file"
                id="image"
                name="image"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setData("image", file);
                  if (imagePreviewUrl) {
                    URL.revokeObjectURL(imagePreviewUrl);
                  }
                  if (file) {
                    setImagePreviewUrl(URL.createObjectURL(file));
                  } else {
                    setImagePreviewUrl(null);
                  }
                }}
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
