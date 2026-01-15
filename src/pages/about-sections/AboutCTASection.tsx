
import React from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Coffee } from "lucide-react";

export const AboutCTASection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-cafe-gold via-cafe-gold/90 to-cafe-gold relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <AnimatedSection>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-playfair text-cafe-black mb-4 sm:mb-6 md:mb-8 shimmer-overlay-text leading-tight">
              Come Experience Our Authentic Cuisine
            </h2>
            <p className="text-cafe-black/90 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
              Join us for a memorable dining experience or reserve our weekend buffet
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-md sm:max-w-none mx-auto">
              <Link to="/reserve" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="button-shimmer w-full sm:w-auto"
                >
                  <Button className="bg-cafe-black text-cafe-white hover:bg-cafe-black/90 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-cafe-black/20 w-full sm:w-auto">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Reserve Buffet
                  </Button>
                </motion.div>
              </Link>
              <Link to="/menu" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="button-shimmer w-full sm:w-auto"
                >
                  <Button variant="outline" className="border-2 border-cafe-black text-cafe-black hover:bg-cafe-black/10 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm w-full sm:w-auto">
                    <Coffee className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    View Menu
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AboutCTASection;
