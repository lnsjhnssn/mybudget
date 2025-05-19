import { useState } from "react";
import { router } from "@inertiajs/react";
import "../../styles/theme.css";

import Navbar from "../../components/Navbar";
import Layout from "../../components/Layout";

export default function AddExpense({
  user,
  existingPlaces = [],
  existingTags = [],
}) {
  const [formData, setFormData] = useState({
    place: "",
    date: new Date().toISOString().split("T")[0],
    amount: "",
    tags: [],
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const formDataToSend = new FormData();
    formDataToSend.append("place", formData.place);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("amount", formData.amount);
    formDataToSend.append("tags", JSON.stringify(formData.tags));
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    router.post("/expenses", formDataToSend, {
      onError: (errors) => setErrors(errors),
      preserveScroll: true,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement("video");
      video.srcObject = stream;
      await video.play();

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);

      stream.getTracks().forEach((track) => track.stop());

      canvas.toBlob((blob) => {
        const file = new File([blob], "camera-capture.jpg", {
          type: "image/jpeg",
        });
        setFormData({ ...formData, image: file });
        setImagePreview(URL.createObjectURL(blob));
      }, "image/jpeg");
    } catch (error) {
      console.error("Error accessing camera:", error);
      setErrors({ ...errors, image: "Could not access camera" });
    }
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
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="form-input"
                step="0.01"
                min="0"
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
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
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
                value={formData.place}
                onChange={(e) =>
                  setFormData({ ...formData, place: e.target.value })
                }
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
                value={formData.tags.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tags: e.target.value.split(",").map((tag) => tag.trim()),
                  })
                }
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
                Receipt Image
              </label>
              <div className="cluster">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-input"
                />
                <button
                  type="button"
                  onClick={handleCameraCapture}
                  className="btn-secondary"
                >
                  Take Photo
                </button>
              </div>
              {imagePreview && (
                <div className="mt-xl">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                  />
                </div>
              )}
              {errors.image && <div className="text-error">{errors.image}</div>}
            </div>
            <button type="submit" className="btn-primary">
              Add Expense
            </button>
          </form>
        </div>
      </main>
    </Layout>
  );
}
