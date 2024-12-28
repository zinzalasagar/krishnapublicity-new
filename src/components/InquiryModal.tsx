import React, { useState } from "react";
import { motion } from "framer-motion"; // For smooth animations

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  selectedService: any;
}

const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  selectedService,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Real-time validation
    if (value.trim() === "") {
      setErrors({ ...errors, [name]: `${name} is required.` });
    } else {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const newErrors: any = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.phone) newErrors.phone = "Phone is required.";
    if (!formData.message) newErrors.message = "Message is required.";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      await onSubmit(formData);
      setSuccessMessage("Inquiry submitted successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setSuccessMessage("Failed to submit inquiry.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md transition-transform"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4 animate-pulse">
          Inquiry for {selectedService?.title}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-gray-600 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full border-2 border-gray-200 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Enter your name"
              required
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 mt-1"
              >
                {errors.name}
              </motion.p>
            )}
          </div>
          <div className="relative">
            <label className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full border-2 border-gray-200 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Enter your email"
              required
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 mt-1"
              >
                {errors.email}
              </motion.p>
            )}
          </div>
          <div className="relative">
            <label className="block text-gray-600 font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full border-2 border-gray-200 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ${
                errors.phone ? "border-red-500" : ""
              }`}
              placeholder="Enter your phone number"
              required
            />
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 mt-1"
              >
                {errors.phone}
              </motion.p>
            )}
          </div>
          <div className="relative">
            <label className="block text-gray-600 font-medium">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className={`w-full border-2 border-gray-200 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ${
                errors.message ? "border-red-500" : ""
              }`}
              rows={4}
              placeholder="Enter your message"
              required
            />
            {errors.message && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 mt-1"
              >
                {errors.message}
              </motion.p>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-transform transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-transform transform hover:scale-105 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Inquiry"}
            </button>
          </div>
        </form>
        {successMessage && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-green-500 text-center"
          >
            {successMessage}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default InquiryModal;
