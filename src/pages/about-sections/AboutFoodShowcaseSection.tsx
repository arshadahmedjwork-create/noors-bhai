
import React from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";

const foodItems = [
  {
    img: "/lovable-uploads/bfadcbd1-afe6-413c-9246-866494a9ca98.png",
    title: "Spiced Eggs",
    desc: "Perfectly boiled eggs topped with crispy fried onions and aromatic spices",
    delay: 0.1
  },
  {
    img: "/lovable-uploads/4331a91c-8627-4873-b747-6f01e4f16e83.png",
    title: "Traditional Curry",
    desc: "Rich and aromatic curry prepared with traditional South Indian spices",
    delay: 0.2
  },
  {
    img: "/lovable-uploads/d044f0ad-1809-437f-88f7-038ac57d4826.png",
    title: "Chicken Specialties",
    desc: "Authentic chicken preparations marinated with traditional spices",
    delay: 0.3
  }
];

export const AboutFoodShowcaseSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-cafe-white to-cafe-white/90">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-playfair text-cafe-black mb-6">
              Authentic <span className="text-cafe-gold">Flavors</span>
            </h2>
            <p className="text-cafe-black/80 text-xl max-w-2xl mx-auto">
              Experience the vibrant colors and rich aromas of our signature dishes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {foodItems.map((item, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-cafe-gold/20 group-hover:border-cafe-gold/40">
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={item.img}
                      alt={item.desc}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cafe-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-playfair text-cafe-black mb-3 group-hover:text-cafe-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-cafe-black/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AboutFoodShowcaseSection;
