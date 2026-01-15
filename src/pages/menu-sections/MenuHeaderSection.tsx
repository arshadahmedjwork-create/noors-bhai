
import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/utils/animations";

/**
 * Premium menu header - clean, minimal, brand-aligned
 */
const MenuHeaderSection = () => (
  <section className="relative bg-background py-16 md:py-20 overflow-hidden">
    {/* Subtle gradient accent */}
    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
    
    <motion.div 
      className="container mx-auto px-4 text-center relative z-10"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        variants={fadeInUp}
        className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair text-foreground mb-4"
      >
        Our Menu
      </motion.h1>
      
      {/* Elegant underline */}
      <motion.div
        variants={fadeInUp}
        className="w-20 h-1 bg-primary mx-auto mb-6 rounded-full"
      />
      
      <motion.p 
        variants={fadeInUp}
        className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
      >
        Discover our authentic dishes at Noor's Bhai Biryani prepared with traditional
        recipes and the freshest ingredients
      </motion.p>
    </motion.div>
  </section>
);

export default MenuHeaderSection;
