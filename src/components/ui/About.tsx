// // src/components/ui/About.tsx
// "use client"
// import React from "react";
// import { motion } from "framer-motion";

// const About = () => {
//   return (
//     <section
//       id="about"
//       className="py-16 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800"
//     >
//       <div className="container mx-auto text-center">
//         <motion.h2
//           className="text-4xl font-extrabold mb-6"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           About Us
//         </motion.h2>
//         <motion.p
//           className="text-lg max-w-3xl mx-auto"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.2 }}
//         >
//           We are a company dedicated to delivering high-quality products and
//           services. With years of experience, we focus on customer satisfaction
//           and excellence.
//         </motion.p>
//         <div className="mt-8 flex justify-center gap-12">
//           <motion.div
//             className="text-2xl font-bold"
//             initial={{ opacity: 0, scale: 0.5 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1, delay: 0.4 }}
//           >
//             10+
//           </motion.div>
//           <motion.div
//             className="text-2xl font-bold"
//             initial={{ opacity: 0, scale: 0.5 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1, delay: 0.6 }}
//           >
//             500+
//           </motion.div>
//           <motion.div
//             className="text-2xl font-bold"
//             initial={{ opacity: 0, scale: 0.5 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1, delay: 0.8 }}
//           >
//             300+
//           </motion.div>
//         </div>
//         <div className="flex justify-center gap-12 text-sm mt-4">
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1, delay: 1 }}
//           >
//             Years of Experience
//           </motion.p>
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1, delay: 1.2 }}
//           >
//             Clients Served
//           </motion.p>
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1, delay: 1.4 }}
//           >
//             Projects Completed
//           </motion.p>
//         </div>
//         <motion.div
//           className="mt-8"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1, delay: 1.6 }}
//         >
//           {/* <img
//             src="/banner.jpg"
//             alt="Our Team"
//             className="rounded-lg shadow-lg mx-auto"
//           /> */}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default About;
