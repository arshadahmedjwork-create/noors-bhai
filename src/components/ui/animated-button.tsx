
import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { buttonHover } from "@/utils/animations";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  hasArrow?: boolean;
}

export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, className, variant = "default", size = "default", hasArrow = false, ...props }, ref) => {
    return (
      <motion.div
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        variants={buttonHover}
        className="inline-block"
      >
        <Button
          ref={ref}
          variant={variant}
          size={size}
          className={cn("relative overflow-hidden group", className)}
          {...props}
        >
          <motion.span className="relative z-10 flex items-center gap-2">
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
                className="transition-transform group-hover:translate-x-1"
                initial={{ x: 0 }}
                animate={{ x: [0, 3, 0] }}
                transition={{
                  duration: 1.5,
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
          </motion.span>
          <motion.span
            className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cafe-gold/40 to-cafe-gold"
            initial={{ scaleX: 0, transformOrigin: "left" }}
            whileHover={{ scaleX: 1, transformOrigin: "left" }}
            transition={{ duration: 0.3 }}
          ></motion.span>
        </Button>
      </motion.div>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export default AnimatedButton;
