
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { buttonHover } from "@/utils/animations";
import { cn } from "@/lib/utils";

interface GlowButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
  glowColor?: string;
  className?: string;
  hasArrow?: boolean;
  hasShimmer?: boolean;
}

export const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ children, className, glowColor = "#E8C75D", hasArrow = false, hasShimmer = true, ...props }, ref) => {
    return (
      <motion.div
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        variants={buttonHover}
        className="inline-block relative"
      >
        <Button
          ref={ref}
          className={cn("relative overflow-hidden group shadow-lg transition-all duration-500 primary-cta glow-button icon-hover", className)}
          {...props}
        >
          {/* Shimmer effect overlay */}
          {hasShimmer && (
            <motion.div
              className="absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 opacity-0 group-hover:opacity-100"
              initial={{ x: "-100%" }}
              whileHover={{ 
                x: "200%",
                transition: { 
                  duration: 0.8, 
                  ease: "easeInOut" 
                }
              }}
            />
          )}

          <span className="relative z-10 flex items-center gap-2">
            {children}
            {hasArrow && (
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-1 icon-hover"
                initial={{ x: 0, opacity: 0.8 }}
                animate={{ 
                  x: [0, 3, 0],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  repeatDelay: 1
                }}
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </motion.svg>
            )}
          </span>

          {/* Enhanced glow effect */}
          <motion.div
            className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-40 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
              filter: "blur(12px)"
            }}
          />

          {/* Pulsing border effect */}
          <motion.div
            className="absolute inset-0 rounded-md border-2 opacity-0 group-hover:opacity-100"
            style={{ borderColor: glowColor }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Bottom shine line with wave effect */}
          <motion.span
            className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cafe-gold to-transparent"
            initial={{ scaleX: 0, transformOrigin: "center" }}
            whileHover={{ 
              scaleX: 1, 
              transformOrigin: "center",
              transition: { duration: 0.4 }
            }}
          />

          {/* Ripple effect on click */}
          <motion.div
            className="absolute inset-0 rounded-md bg-white/20 opacity-0"
            whileTap={{
              scale: [0, 1.2],
              opacity: [0.3, 0],
              transition: { duration: 0.4 }
            }}
          />
        </Button>
      </motion.div>
    );
  }
);

GlowButton.displayName = "GlowButton";

export default GlowButton;
