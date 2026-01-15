
import React from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Award, Heart, Users } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Authenticity",
    desc: "We stay true to traditional Chennai biryani recipes and techniques, using authentic ingredients to create genuine flavors that transport you to South India.",
    delay: 0.1
  },
  {
    icon: Heart,
    title: "Quality",
    desc: "From ingredient sourcing to preparation, we maintain the highest standards to ensure a premium dining experience with every single bite.",
    delay: 0.2
  },
  {
    icon: Users,
    title: "Hospitality",
    desc: "We believe in treating every guest like family, providing warm, attentive service that makes everyone feel welcome and valued.",
    delay: 0.3
  }
];

export const AboutValuesSection = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-cafe-black via-cafe-brown/10 to-cafe-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-cafe-gold/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cafe-brown/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-playfair text-cafe-gold mb-4 sm:mb-6 leading-tight">
                Our <span className="text-cafe-white">Values</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cafe-gold to-transparent mx-auto mb-6"></div>
              <p className="text-cafe-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                The principles that guide everything we do at Noor's Bhai Biryani
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  className="group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: value.delay, duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <div className="relative bg-cafe-black/60 backdrop-blur-sm border border-cafe-gold/20 rounded-2xl p-6 sm:p-8 text-center h-full transition-all duration-500 group-hover:border-cafe-gold/40 group-hover:shadow-2xl group-hover:shadow-cafe-gold/10">
                    {/* Icon Container */}
                    <motion.div
                      className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-cafe-gold/20 to-cafe-brown/20 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:from-cafe-gold/30 group-hover:to-cafe-brown/30 transition-all duration-500"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-cafe-gold" />
                    </motion.div>
                    
                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-playfair text-cafe-gold mb-4 sm:mb-6 group-hover:text-cafe-white transition-colors duration-300">
                      {value.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-cafe-white/80 leading-relaxed text-sm sm:text-base group-hover:text-cafe-white/90 transition-colors duration-300">
                      {value.desc}
                    </p>

                    {/* Decorative Element */}
                    <motion.div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-cafe-gold to-cafe-brown group-hover:w-full transition-all duration-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ delay: value.delay + 0.5, duration: 0.8 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Decorative Element */}
          <motion.div
            className="text-center mt-12 sm:mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-4">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-cafe-gold"></div>
              <div className="w-3 h-3 bg-cafe-gold rounded-full"></div>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-cafe-gold"></div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AboutValuesSection;
