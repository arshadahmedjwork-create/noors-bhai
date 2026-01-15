
import React from "react";
import { motion } from "framer-motion";
import { Star, Check } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/utils/animations";

const USPHighlightsSection = () => {
  return (
    <section className="bg-cafe-black py-10">
      <motion.div
        className="container mx-auto px-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div 
          variants={fadeInUp} 
          className="bg-cafe-black rounded-xl p-8 text-center shadow-md border-cafe-gold/30 border max-w-4xl mx-auto"
        >
          <h3 className="font-playfair text-2xl md:text-3xl font-bold text-cafe-gold mb-6 flex items-center justify-center gap-2">
            <Star size={22} className="inline-block text-cafe-gold" />
            Why Noor Bhai's?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-cafe-white">
            <div className="flex items-center gap-2 justify-center">
              <Check className="text-cafe-gold w-6 h-6 flex-shrink-0" />
              <span className="text-lg font-medium">Only Restaurant in Ontario Serving Authentic Chennai-Style Biryani</span>
            </div>
            
            <div className="flex items-center gap-2 justify-center">
              <Check className="text-cafe-gold w-6 h-6 flex-shrink-0" />
              <span className="text-lg font-medium">Every item priced under $15 — Value Meets Authenticity</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default USPHighlightsSection;
