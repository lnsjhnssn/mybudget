import { useForm } from "@inertiajs/react";
import DatePicker from "react-datepicker";
import CreatableSelect from "react-select/creatable";
import "../../styles/theme.css";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datepicker.css";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { customSelectStyles } from "../../styles/selectStyles";
import useDisableNumberInputScroll from "../../helpers/useDisableNumberInputScroll";

export default function AddExpense({
  user,
  existingPlaces = [],
  existingTags = [],
}) {
  // Disable scroll on number input
  useDisableNumberInputScroll();

  const today = new Date();

  const { data, setData, post, processing, errors } = useForm({
    place: "",
    date: today,
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

    // Prepare data with defaults
    const formData = {
      place: data.place.trim() || "Unknown Place",
      date:
        data.date instanceof Date
          ? data.date.toISOString().split("T")[0]
          : data.date,
      amount: data.amount ? parseFloat(data.amount) : 0,
      tags: data.tags
        ? data.tags
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t)
        : ["Other"],
      image: data.image,
    };

    post("/expenses", formData);
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
              className="btn-large btn-green"
            >
              {processing ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </main>
    </Layout>
  );
}
