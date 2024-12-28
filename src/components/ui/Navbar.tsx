// "use client";
// import React, { useState, useEffect } from "react";
// import { Link as ScrollLink } from "react-scroll";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiHome,
//   FiInfo,
//   FiImage,
//   FiPhone,
//   FiBriefcase,
//   FiSearch,
//   FiUser,
// } from "react-icons/fi";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [scrollProgress, setScrollProgress] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//       const totalHeight = document.body.scrollHeight - window.innerHeight;
//       setScrollProgress((window.scrollY / totalHeight) * 100);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <motion.nav
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className={`${
//         isScrolled
//           ? "bg-opacity-90 shadow-lg backdrop-blur-md bg-white text-black"
//           : "bg-opacity-0 text-white"
//       } fixed w-full z-50 transition-all duration-300`}
//     >
//       <div className="container mx-auto flex justify-between items-center px-6 py-4">
//         <motion.div
//           initial={{ scale: 1 }}
//           whileHover={{ scale: 1.1 }}
//           className="text-2xl font-bold cursor-pointer"
//         >
//           <ScrollLink to="home" smooth={true} duration={500}>
//             <Image src={"/logo.jpg"} alt="logo" width={125} height={150} />
//           </ScrollLink>
//         </motion.div>
//         <div className="hidden md:flex space-x-6 items-center">
//           {[
//             { section: "home", label: "Home", icon: <FiHome /> },
//             { section: "about", label: "About", icon: <FiInfo /> },
//             { section: "services", label: "Services", icon: <FiBriefcase /> },
//             { section: "gallery", label: "Gallery", icon: <FiImage /> },
//             { section: "contact", label: "Contact", icon: <FiPhone /> },
//           ].map(({ section, label, icon }) => (
//             <ScrollLink
//               key={section}
//               to={section}
//               smooth={true}
//               duration={500}
//               className="flex items-center space-x-2 cursor-pointer hover:text-indigo-200 transition-colors duration-300"
//             >
//               <span>{icon}</span>
//               <span>{label}</span>
//             </ScrollLink>
//           ))}
//           <FiSearch className="text-white cursor-pointer hover:text-indigo-200 transition-colors duration-300" />
//           <FiUser className="text-white cursor-pointer hover:text-indigo-200 transition-colors duration-300" />
//         </div>
//         <div className="md:hidden">
//           <button onClick={toggleMenu} className="focus:outline-none">
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ height: 0 }}
//             animate={{ height: "auto" }}
//             exit={{ height: 0 }}
//             className="md:hidden bg-white overflow-hidden"
//           >
//             <ul className="flex flex-col items-center space-y-4 py-4">
//               {[
//                 { section: "home", label: "Home", icon: <FiHome /> },
//                 { section: "about", label: "About", icon: <FiInfo /> },
//                 {
//                   section: "services",
//                   label: "Services",
//                   icon: <FiBriefcase />,
//                 },
//                 { section: "gallery", label: "Gallery", icon: <FiImage /> },
//                 { section: "contact", label: "Contact", icon: <FiPhone /> },
//               ].map(({ section, label, icon }) => (
//                 <ScrollLink
//                   key={section}
//                   to={section}
//                   smooth={true}
//                   duration={500}
//                   className="text-indigo-600 flex items-center space-x-2 cursor-pointer hover:text-indigo-400 transition-colors duration-300"
//                   onClick={toggleMenu}
//                 >
//                   <span>{icon}</span>
//                   <span>{label}</span>
//                 </ScrollLink>
//               ))}
//               <li className="text-indigo-600 flex items-center space-x-2 cursor-pointer hover:text-indigo-400 transition-colors duration-300">
//                 <FiSearch />
//                 <span>Search</span>
//               </li>
//               <li className="text-indigo-600 flex items-center space-x-2 cursor-pointer hover:text-indigo-400 transition-colors duration-300">
//                 <FiUser />
//                 <span>User</span>
//               </li>
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//       <div
//         className="fixed top-0 left-0 h-1 bg-indigo-600"
//         style={{ width: `${scrollProgress}%` }}
//       ></div>
//     </motion.nav>
//   );
// };

// export default Navbar;
