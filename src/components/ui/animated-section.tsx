
import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: Variants;
  delay?: number;
  once?: boolean;
  threshold?: number;
}

export const AnimatedSection = ({
  children,
  className = "",
  animation,
  delay = 0,
  once = true,
  threshold = 0.2,
}: AnimatedSectionProps) => {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  });

  const defaultAnimation: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={animation || defaultAnimation}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
