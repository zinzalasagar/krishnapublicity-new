"use client";

import React, { useState } from "react";

const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Message sent!");
    }, 2000);
  };

  return (
    <section id="contact" className="py-16 bg-white text-gray-800">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
        <form className="space-y-4 max-w-lg mx-auto" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded-lg"
            required
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-3 border rounded-lg"
            required
          ></textarea>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
