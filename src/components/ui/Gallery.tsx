// "use client";
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const Gallery = () => {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   return (
//     <section
//       id="gallery"
//       className="py-16 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800"
//     >
//       <div className="container mx-auto text-center">
//         <h2 className="text-4xl font-extrabold mb-6">Our Gallery</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {[1, 2, 3].map((i) => (
//             <motion.div
//               key={i}
//               className="p-6 shadow-lg cursor-pointer"
//               onClick={() => setSelectedImage(`/images/gallery${i}.jpg`)}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <img
//                 src={`/images/gallery${i}.jpg`}
//                 alt={`Gallery Image ${i}`}
//                 className="rounded-lg transform transition-transform duration-300 ease-in-out"
//               />
//             </motion.div>
//           ))}
//         </div>
//         <AnimatePresence>
//           {selectedImage && (
//             <motion.div
//               className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             >
//               <motion.img
//                 src={selectedImage}
//                 className="rounded-lg max-w-xl"
//                 initial={{ scale: 0.8 }}
//                 animate={{ scale: 1 }}
//                 exit={{ scale: 0.8 }}
//                 transition={{ duration: 0.3 }}
//               />
//               <button
//                 onClick={() => setSelectedImage(null)}
//                 className="absolute top-5 right-5 text-white text-2xl"
//               >
//                 ✕
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </section>
//   );
// };

// export default Gallery;
