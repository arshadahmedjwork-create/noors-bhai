
import React from "react";
import { motion } from "framer-motion";

interface SectionTransitionProps {
  type?: "spice-trail" | "smoke-trail" | "gradient-wave";
  direction?: "up" | "down";
  color?: "gold" | "brown" | "gradient";
}

export const SectionTransition = ({ 
  type = "spice-trail", 
  direction = "down",
  color = "gold"
}: SectionTransitionProps) => {
  const colorVariants = {
    gold: "from-cafe-gold via-yellow-400 to-cafe-gold",
    brown: "from-cafe-brown via-amber-600 to-cafe-brown",
    gradient: "from-cafe-gold via-cafe-brown to-cafe-black"
  };

  if (type === "spice-trail") {
    return (
      <div className={`relative h-24 overflow-hidden ${direction === 'up' ? 'rotate-180' : ''}`}>
        <motion.div 
          className="absolute inset-0 opacity-30"
          initial={{ backgroundPosition: "0% 0%" }}
          animate={{ backgroundPosition: "100% 100%" }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{
            background: `conic-gradient(from 0deg, transparent, ${colorVariants[color].split(' ')[1]}, transparent)`,
            backgroundSize: "200% 200%"
          }}
        />
        
        {/* Floating Spice Particles */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                i % 4 === 0 ? 'bg-cafe-gold' :
                i % 4 === 1 ? 'bg-red-400' :
                i % 4 === 2 ? 'bg-green-400' : 'bg-yellow-400'
              }`}
              style={{
                left: `${(i * 8) % 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: direction === 'down' ? [0, 96] : [96, 0],
                x: [0, Math.sin(i) * 50],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === "smoke-trail") {
    return (
      <div className={`relative h-32 overflow-hidden ${direction === 'up' ? 'rotate-180' : ''}`}>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 w-full h-full bg-gradient-to-t from-white/20 via-white/10 to-transparent"
            style={{
              left: `${i * 20}%`,
              width: "40%",
              transformOrigin: "bottom"
            }}
            animate={{
              scaleY: [0.5, 1.2, 0.8, 1],
              scaleX: [1, 1.2, 0.9, 1.1],
              opacity: [0.3, 0.6, 0.2, 0.4],
              skewX: [0, 5, -3, 2]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    );
  }

  // Gradient Wave
  return (
    <div className={`relative h-20 overflow-hidden ${direction === 'up' ? 'rotate-180' : ''}`}>
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${colorVariants[color]} opacity-60`}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundSize: "200% 200%",
          clipPath: "polygon(0 0, 100% 0, 100% 70%, 85% 100%, 15% 100%, 0 70%)"
        }}
      />
      
      <motion.div
        className={`absolute inset-0 bg-gradient-to-l ${colorVariants[color]} opacity-40`}
        animate={{
          backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
          delay: 1
        }}
        style={{
          backgroundSize: "300% 300%",
          clipPath: "polygon(0 30%, 15% 0, 85% 0, 100% 30%, 100% 100%, 0 100%)"
        }}
      />
    </div>
  );
};

export default SectionTransition;
