import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5"; // Close icon for the modal
import Modal from "./Modal"; // Your reusable modal component

interface BuyNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    name: string;
    contactNumber: string;
    email: string;
    gstin?: string;
    productQuantity: string;
    address?: string;
    remark?: string;
  }) => Promise<void>;
}
const BuyNowModal: React.FC<BuyNowModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    gstin: "",
    productQuantity: "",
    address: "",
    remark: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Form validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.contactNumber) newErrors.contactNumber = "Contact Number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.productQuantity) newErrors.productQuantity = "Product Quantity is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return; // Stop if validation fails

    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
    onClose(); // Close modal after submission
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.div
        className="p-8 bg-white rounded-2xl shadow-2xl relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        {/* Close button */}
        <motion.button
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
          onClick={onClose}
          whileHover={{ rotate: 90, scale: 1.2 }}
        >
          <IoClose size={24} />
        </motion.button>

        {/* Form Heading */}
        <motion.h2
          className="text-3xl font-bold mb-6 text-center text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Request an Order
        </motion.h2>

        {/* Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="relative">
            <motion.input
              type="text"
              name="name"
              placeholder="Name*"
              className={`p-3 border rounded-lg w-full shadow-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              onChange={handleChange}
              whileFocus={{ scale: 1.05 }}
              whileHover={{ scale: 1.02 }}
            />
            {errors.name && (
              <span className="text-red-500 text-sm absolute -bottom-6">
                {errors.name}
              </span>
            )}
          </div>

          <div className="relative">
            <motion.input
              type="text"
              name="contactNumber"
              placeholder="Contact Number*"
              className={`p-3 border rounded-lg w-full shadow-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                errors.contactNumber ? "border-red-500" : "border-gray-300"
              }`}
              onChange={handleChange}
              whileFocus={{ scale: 1.05 }}
              whileHover={{ scale: 1.02 }}
            />
            {errors.contactNumber && (
              <span className="text-red-500 text-sm absolute -bottom-6">
                {errors.contactNumber}
              </span>
            )}
          </div>

          <div className="relative">
            <motion.input
              type="email"
              name="email"
              placeholder="Email*"
              className={`p-3 border rounded-lg w-full shadow-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              onChange={handleChange}
              whileFocus={{ scale: 1.05 }}
              whileHover={{ scale: 1.02 }}
            />
            {errors.email && (
              <span className="text-red-500 text-sm absolute -bottom-6">
                {errors.email}
              </span>
            )}
          </div>

          <motion.input
            type="text"
            name="gstin"
            placeholder="GSTIN"
            className="p-3 border rounded-lg w-full shadow-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            whileFocus={{ scale: 1.05 }}
            whileHover={{ scale: 1.02 }}
          />

          <div className="relative">
            <motion.input
              type="number"
              name="productQuantity"
              placeholder="Product Quantity*"
              className={`p-3 border rounded-lg w-full shadow-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                errors.productQuantity ? "border-red-500" : "border-gray-300"
              }`}
              onChange={handleChange}
              whileFocus={{ scale: 1.05 }}
              whileHover={{ scale: 1.02 }}
            />
            {errors.productQuantity && (
              <span className="text-red-500 text-sm absolute -bottom-6">
                {errors.productQuantity}
              </span>
            )}
          </div>
        </div>

        <motion.textarea
          name="address"
          placeholder="Address"
          className="w-full p-3 mt-4 border rounded-lg shadow-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          whileFocus={{ scale: 1.05 }}
          whileHover={{ scale: 1.02 }}
        />

        <motion.textarea
          name="remark"
          placeholder="Remark"
          className="w-full p-3 mt-4 border rounded-lg shadow-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          whileFocus={{ scale: 1.05 }}
          whileHover={{ scale: 1.02 }}
        />

        {/* Submit button */}
        <div className="mt-6 flex justify-end">
          <motion.button
            className={`px-6 py-3 rounded-lg shadow-lg transition-all duration-300 text-white ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 transform hover:scale-105"
            }`}
            onClick={handleSubmit}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Buy Now"}
          </motion.button>
        </div>
      </motion.div>
    </Modal>
  );
};

export default BuyNowModal;
