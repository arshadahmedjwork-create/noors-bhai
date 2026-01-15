
import React from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Award, Star, Users } from "lucide-react";

export const AboutChefSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-cafe-black via-cafe-brown/30 to-cafe-black relative overflow-hidden">
      {/* Spotlight Effect */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cafe-gold/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <motion.div
              className="flex items-center justify-center gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Award className="w-8 h-8 text-cafe-gold" />
              <h2 className="text-4xl md:text-5xl font-bold font-playfair text-cafe-gold">
                Meet Our Culinary Master
              </h2>
              <Star className="w-8 h-8 text-cafe-gold" />
            </motion.div>
            <p className="text-cafe-white/80 text-xl max-w-2xl mx-auto">
              The heart and soul behind every authentic biryani
            </p>
          </div>

          <motion.div 
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-cafe-black/80 backdrop-blur-sm rounded-3xl p-12 text-center hover:scale-[1.02] transition-all duration-500 border border-cafe-gold/20">
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-cafe-gold to-cafe-brown rounded-full mx-auto mb-8 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <Users className="w-10 h-10 text-cafe-black" />
              </motion.div>
              
              <h3 className="text-3xl md:text-4xl font-playfair text-cafe-gold mb-3">
                Chef Noor Mohammed
              </h3>
              <p className="text-cafe-gold/80 text-lg mb-8">Master of Chennai-Style Biryani</p>
              
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cafe-gold to-transparent mx-auto mb-8"></div>
              
              <div className="text-cafe-white/90 leading-relaxed max-w-4xl mx-auto text-lg">
                <p>
                  Chef Noor Mohammed, driven by the rich culinary heritage of Chennai, brings the authentic flavors of Chennai-style biryani to Mississauga with every bite. He strives for that exact texture and taste, ensuring a truly original biryani experience that honors the traditional methods and aromatic spice blends that make each grain of rice a testament to culinary excellence.
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AboutChefSection;
