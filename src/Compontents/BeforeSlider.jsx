import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BeforeSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto Slide كل 3 ثواني
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <div className="w-full max-w-2xl" style={{marginLeft:'auto' , marginRight:'auto' , marginTop:'25px'}}>
      <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-xl shadow-lg bg-black">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt="Before"
            className="absolute top-0 left-0 w-full h-full object-cover"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            loading="lazy"
          />
        </AnimatePresence>
      </div>

      {/* ✅ Dots Navigation */}
      <div className="flex justify-center mt-4 gap-2" style={{marginTop:'7.5px'}}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-blue-500 scale-110" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default BeforeSlider;
