// src/components/HeaderWithBack.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Next.js router for navigation
import { motion } from "framer-motion"; // For smooth animations

const HeaderWithBack = ({ title }: { title: string }) => {
  const router = useRouter();

  // Function to handle back navigation
  const handleBack = () => {
    router.back(); // Go to the previous page
  };

  return (
    <motion.header
      className="sticky top-0 z-50 p-4 bg-gradient-to-r  to-primary-darker from-indigo-500 via-purple-500 to-pink-500 shadow-lg backdrop-blur-lg bg-opacity-30 border-b border-white/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.button
          onClick={handleBack}
          className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Back Icon (Arrow Left) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-medium">Back</span>
        </motion.button>

        {/* Page Title */}
        <motion.h1
          className="text-3xl font-extrabold text-white tracking-wide"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>

        {/* Placeholder for additional actions */}
        <div className="flex items-center space-x-4">
          {/* Example of additional buttons or icons */}
          <motion.button
            className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-40 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Action Icon (Example: Bell Notification) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405C18.042 14.368 17.5 12.888 17.5 11.5v-4a5.5 5.5 0 00-11 0v4c0 1.388-.542 2.868-1.095 4.095L5 17h5m5 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default HeaderWithBack;
