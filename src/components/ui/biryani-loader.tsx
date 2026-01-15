
import React from "react";
import { motion } from "framer-motion";

interface BiryaniLoaderProps {
  isLoading?: boolean;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export const BiryaniLoader = ({ 
  isLoading = true, 
  size = "md", 
  showText = true 
}: BiryaniLoaderProps) => {
  const sizeClasses = {
    sm: "w-16 h-20",
    md: "w-24 h-30",
    lg: "w-32 h-40"
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  if (!isLoading) return null;

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Biryani Pot */}
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Pot Base */}
        <motion.div
          className="absolute bottom-0 w-full h-3/4 bg-gradient-to-b from-cafe-brown to-cafe-black rounded-b-full border-2 border-cafe-gold"
          initial={{ scale: 0.9, opacity: 0.8 }}
          animate={{ 
            scale: [0.9, 1, 0.9],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        {/* Pot Lid */}
        <motion.div
          className="absolute top-0 w-full h-1/3 bg-gradient-to-b from-cafe-gold to-cafe-brown rounded-t-full border-2 border-cafe-gold"
          animate={{ 
            y: [0, -5, 0],
            rotateZ: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        {/* Biryani Rice Fill Animation */}
        <motion.div
          className="absolute bottom-2 left-2 right-2 bg-gradient-to-t from-cafe-gold via-yellow-300 to-orange-200 rounded-b-full opacity-80"
          initial={{ height: "0%" }}
          animate={{ height: ["0%", "60%", "0%"] }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            times: [0, 0.7, 1]
          }}
        />
        
        {/* Steam Animation */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-4 bg-white/60 rounded-full"
              style={{ left: `${(i - 1) * 8}px` }}
              animate={{
                y: [0, -20, -40],
                opacity: [0.8, 0.4, 0],
                scale: [1, 1.2, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
        
        {/* Floating Spice Particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                i % 3 === 0 ? 'bg-red-400' : 
                i % 3 === 1 ? 'bg-yellow-400' : 
                'bg-green-400'
              }`}
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 60 + 20}%`
              }}
              animate={{
                y: [0, -10, 0],
                x: [0, Math.random() * 10 - 5, 0],
                opacity: [0.6, 1, 0.6],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Loading Text */}
      {showText && (
        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.p 
            className={`text-cafe-gold font-medium ${textSizes[size]} mb-2`}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Preparing your feast...
          </motion.p>
          <motion.div 
            className="flex justify-center space-x-1"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  repeat: Infinity,
                  repeatType: "loop",
                  repeatDelay: 1
                }
              }
            }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-cafe-gold rounded-full"
                variants={{
                  hidden: { y: 0, opacity: 0.5 },
                  visible: { 
                    y: -10, 
                    opacity: 1,
                    transition: { duration: 0.5, ease: "easeOut" }
                  }
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default BiryaniLoader;
