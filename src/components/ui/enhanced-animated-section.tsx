
import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface EnhancedAnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scaleIn" | "slideInUp" | "custom";
  customAnimation?: Variants;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  hasParticles?: boolean;
  gradientOverlay?: boolean;
}

const animations = {
  fadeInUp: {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  fadeInLeft: {
    hidden: { 
      opacity: 0, 
      x: -60,
      rotateY: -15
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  },
  fadeInRight: {
    hidden: { 
      opacity: 0, 
      x: 60,
      rotateY: 15
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  },
  scaleIn: {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateZ: -5
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateZ: 0,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  },
  slideInUp: {
    hidden: { 
      opacity: 0, 
      y: 100,
      rotateX: 45
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }
};

export const EnhancedAnimatedSection = ({
  children,
  className = "",
  animation = "fadeInUp",
  customAnimation,
  delay = 0,
  duration = 0.8,
  once = true,
  threshold = 0.2,
  hasParticles = false,
  gradientOverlay = false,
}: EnhancedAnimatedSectionProps) => {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  });

  const selectedAnimation = customAnimation || animations[animation];

  // Add delay and duration to the animation
  const enhancedAnimation = {
    ...selectedAnimation,
    visible: {
      ...selectedAnimation.visible,
      transition: {
        ...selectedAnimation.visible.transition,
        delay,
        duration,
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={enhancedAnimation}
      className={`relative ${hasParticles ? 'floating-particles' : ''} ${className}`}
    >
      {gradientOverlay && (
        <div className="absolute inset-0 bg-gradient-to-br from-cafe-gold/5 via-transparent to-cafe-brown/5 pointer-events-none rounded-lg" />
      )}
      {children}
    </motion.div>
  );
};

export default EnhancedAnimatedSection;
