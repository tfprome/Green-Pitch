import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import api from "@/api/apiInstance";

const Backendurl = import.meta.env.VITE_BACKEND_URL;

const AddProductForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    brandname: "",
    branddesc: "",
    brandprice: "",
    brandstar: "",
    brandID: "",
    categoryID: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Must use FormData because we're sending a file
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => data.append(key, val));
      if (imageFile) data.append("brandimg", imageFile);

      const response = await api.post(`${Backendurl}/admin/addproduct`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        toast.success("Product added successfully!");
        onClose();
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: "Product Name", name: "brandname", type: "text", required: true, span: true },
    { label: "Brand ID", name: "brandID", type: "text", required: true },
    { label: "Category ID", name: "categoryID", type: "text", required: true },
    { label: "Price (৳)", name: "brandprice", type: "number", required: true },
    { label: "Rating (1-5)", name: "brandstar", type: "number", required: false },
    { label: "Description", name: "branddesc", type: "text", required: false, span: true },
  ];

  return (
    <div>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400" />

          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center text-green-600 text-lg font-bold">
                +
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-800 leading-tight">Add New Product</h2>
                <p className="text-xs text-gray-400">Fill in the details below</p>
              </div>
            </div>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors text-lg"
            >
              ✕
            </motion.button>
          </div>

          {/* Form — scrollable if content overflows */}
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 max-h-[75vh] overflow-y-auto">

            {/* Image Upload */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
                Product Image
              </label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all overflow-hidden">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1 text-gray-400">
                    <span className="text-2xl">📷</span>
                    <span className="text-xs">Click to upload image</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </motion.div>

            {/* Text Fields */}
            <div className="grid grid-cols-2 gap-4">
              {fields.map((field, i) => (
                <motion.div
                  key={field.name}
                  className={field.span ? "col-span-2" : ""}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i + 1) * 0.06 }}
                >
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-0.5">*</span>}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    min={field.name === "brandstar" ? 1 : undefined}
                    max={field.name === "brandstar" ? 5 : undefined}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent focus:bg-white transition-all"
                  />
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.97 }}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl transition-all shadow-md shadow-green-100 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading && (
                  <motion.span
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                  />
                )}
                {loading ? "Saving..." : "Add Product"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AddProductForm;