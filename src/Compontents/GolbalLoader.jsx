// src/components/GlobalLoader.jsx
import { useLoading } from "../context/LoadingContext";
import { motion } from "framer-motion";

export default function GlobalLoader() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="loader fixed inset-0 flex items-center justify-center bg-white bg-opacity-95 z-[9999]"
    >
      <motion.div
        className="flex gap-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-4 h-4 bg-blue-500 dark:bg-blue-400 rounded-full"
            variants={{
              hidden: { opacity: 0.3, y: 0 },
              visible: {
                opacity: 1,
                y: [0, -10, 0],
                transition: {
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                },
              },
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
