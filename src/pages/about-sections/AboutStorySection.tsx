
import React from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";

export const AboutStorySection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-cafe-white to-cafe-white/95 relative">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="space-y-6"
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-cafe-gold/20 shadow-lg">
                <h2 className="text-4xl md:text-5xl font-bold font-playfair text-cafe-black mb-6">
                  The Noor's Bhai{" "}
                  <span className="text-cafe-gold">Journey</span>
                </h2>
                <div className="space-y-5 text-cafe-black/90 leading-relaxed">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    Founded with a passion to share the authentic flavors of Chennai with the diverse community of Mississauga, Noor's Bhai Biryani was born from Chef Noor Mohammed's dedication to preserving traditional South Indian culinary heritage.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    What began as a dream to bring the exact texture and taste of Chennai-style biryani has grown into a beloved culinary destination, known for our commitment to authenticity, quality, and the warmth of traditional hospitality.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    Each dish at Noor's Bhai tells a story of culinary heritage, prepared with carefully sourced ingredients and time-honored techniques that have been passed down through generations of Chennai's finest biryani masters.
                  </motion.p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative group"
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-cafe-gold/20 via-cafe-brown/20 to-cafe-gold/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative rounded-2xl overflow-hidden border border-cafe-gold/30 shadow-2xl">
                <img
                  src="/lovable-uploads/d9273534-3ab5-4467-b460-7b4f99e81f8e.png"
                  alt="Authentic biryani preparation in traditional copper vessel"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cafe-black/20 via-transparent to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AboutStorySection;
