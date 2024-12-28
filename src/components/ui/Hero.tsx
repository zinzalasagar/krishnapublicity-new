// "use client";
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

// const heroImages = [
//   "/banner.jpg",
//   "/banner3.jpg",
//   "/banner.jpg",
//   // "/banner2.jpg",
// // ];

// const Hero = () => {
//   const [currentImage, setCurrentImage] = useState(0);

//   // Automatic slider every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prevImage) => (prevImage + 1) % heroImages.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   // Handle manual slide navigation
//   const goToPrevious = () => {
//     setCurrentImage(
//       (prevImage) => (prevImage - 1 + heroImages.length) % heroImages.length
//     );
//   };

//   const goToNext = () => {
//     setCurrentImage((prevImage) => (prevImage + 1) % heroImages.length);
//   };

//   return (
//     <section
//       id="home"
//       className="relative h-screen w-full flex items-center justify-center bg-cover bg-center transition-all duration-700"
//       style={{
//         backgroundImage: `url(${heroImages[currentImage]})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black opacity-50"></div>

//       {/* Content */}
//       <div className="text-center z-10 max-w-2xl px-4">
//         <motion.h1
//           className="text-6xl font-bold text-white"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           Welcome to Krishna Publicity
//         </motion.h1>
//         <motion.p
//           className="mt-4 text-xl text-white"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           Your Trusted Partner for Creative Advertising Solutions
//         </motion.p>
//         <motion.button
//           className="mt-6 px-6 py-3 bg-white text-blue-500 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 shadow-lg"
//           whileHover={{ scale: 1.05 }}
//         >
//           Get Started
//         </motion.button>
//       </div>

//       {/* Manual Navigation Arrows */}
//       <div className="absolute inset-0 flex justify-between items-center px-4 z-10">
//         <button
//           onClick={goToPrevious}
//           className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300"
//         >
//           <FiArrowLeft className="text-gray-800 w-6 h-6" />
//         </button>
//         <button
//           onClick={goToNext}
//           className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300"
//         >
//           <FiArrowRight className="text-gray-800 w-6 h-6" />
//         </button>
//       </div>

//       {/* Pagination Dots */}
//       <div className="absolute bottom-8 flex justify-center w-full z-10">
//         {heroImages.map((_, index) => (
//           <div
//             key={index}
//             className={`w-3 h-3 mx-2 rounded-full transition-all duration-500 ${
//               currentImage === index ? "bg-white" : "bg-gray-400"
//             }`}
//           ></div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Hero;
