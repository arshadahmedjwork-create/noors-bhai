
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiryaniLoader } from "./biryani-loader";

interface PageLoaderProps {
  children: React.ReactNode;
  loadingDuration?: number;
  showLoader?: boolean;
}

export const PageLoader = ({ 
  children, 
  loadingDuration = 2000,
  showLoader = true
}: PageLoaderProps) => {
  const [isLoading, setIsLoading] = useState(showLoader);

  useEffect(() => {
    if (showLoader) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, loadingDuration);

      return () => clearTimeout(timer);
    }
  }, [showLoader, loadingDuration]);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          className="fixed inset-0 bg-cafe-black flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <BiryaniLoader size="lg" showText />
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
