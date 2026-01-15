import { Variants } from "framer-motion";

/**
 * PREMIUM MOTION SYSTEM
 * Consistent, elegant animations across the site
 * 
 * Rules:
 * - Duration: 450-700ms for reveals
 * - Easing: Soft, no bouncy overshoot
 * - Movement: 8-16px translate on fade-ups
 * - Stagger: 60-90ms between children
 */

// Standard easing curves (smooth, premium feel)
const easeOut = [0.16, 1, 0.3, 1];
const easeSoft = [0.4, 0, 0.2, 1];

// Primary fade-up animation (main reveal animation)
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 16 
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
      delay: delay * 0.08
    }
  })
};

// Container with stagger effect
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

// Scale in animation (for cards, images)
export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95 
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeOut
    }
  }
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 24 
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easeOut
    }
  }
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -24 
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easeOut
    }
  }
};

// Hero section text animation (slightly longer duration)
export const heroTextAnimation: Variants = {
  hidden: { 
    opacity: 0, 
    y: 24 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOut
    }
  }
};

// Button hover animation (micro-lift)
export const buttonHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -2,
    transition: {
      duration: 0.25,
      ease: easeSoft
    }
  },
  tap: { 
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

// Card hover animation (micro-lift + shadow)
export const cardHover = {
  rest: { 
    y: 0,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
  },
  hover: {
    y: -4,
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
    transition: {
      duration: 0.35,
      ease: easeSoft
    }
  }
};

// Image zoom effect (subtle parallax on hover)
export const imageZoom = {
  rest: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.7,
      ease: easeSoft
    }
  }
};

// Subtle glow pulse (for accents)
export const glowPulse = {
  initial: { 
    opacity: 0.6,
    boxShadow: "0 0 20px rgba(232, 199, 93, 0.2)"
  },
  animate: {
    opacity: [0.6, 0.8, 0.6],
    boxShadow: [
      "0 0 20px rgba(232, 199, 93, 0.2)",
      "0 0 40px rgba(232, 199, 93, 0.35)",
      "0 0 20px rgba(232, 199, 93, 0.2)"
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Text reveal animation
export const textReveal: Variants = {
  hidden: {
    y: 40,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: easeOut
    }
  }
};

// Float animation (very subtle, for hero elements)
export const float = {
  initial: { y: 0 },
  animate: {
    y: [-4, 4, -4],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Underline grow animation
export const underlineGrow: Variants = {
  hidden: { width: "0%" },
  visible: {
    width: "100%",
    transition: {
      duration: 0.6,
      ease: easeOut
    }
  }
};

// Very subtle rotate (for decorative elements)
export const rotate = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 30,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Subtle bounce (for scroll indicators)
export const bounce: Variants = {
  hidden: { y: 0 },
  visible: {
    y: [0, -8, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Page transition (subtle fade)
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

// Parallax effect (very subtle)
export const parallax = (offset: number = 0.03) => ({
  initial: { y: 0 },
  animate: (scrollY: number) => ({
    y: scrollY * offset,
    transition: { type: "tween", ease: "linear" }
  })
});

