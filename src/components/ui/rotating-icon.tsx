
import React from "react";
import { motion } from "framer-motion";

interface RotatingIconProps {
  icon: React.ReactNode;
  className?: string;
  speed?: number;
  hover?: boolean;
}

export const RotatingIcon = ({
  icon,
  className = "",
  speed = 10,
  hover = true,
}: RotatingIconProps) => {
  const animationVariants = {
    initial: { rotate: 0 },
    animate: hover ? {} : { rotate: 360 },
    hover: { rotate: 360 },
  };

  return (
    <motion.div
      className={className}
      initial="initial"
      animate={hover ? "initial" : "animate"}
      whileHover="hover"
      variants={animationVariants}
      transition={{
        rotate: {
          duration: speed,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }
      }}
    >
      {icon}
    </motion.div>
  );
};

export default RotatingIcon;
