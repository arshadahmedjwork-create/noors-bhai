
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import GlowButton from "@/components/ui/glow-button";
import { fadeInUp, staggerContainer } from "@/utils/animations";

const MenuHighlightsSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-cafe-white to-cafe-cream relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #E8C75D 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
          animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.div 
        className="container mx-auto px-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        style={{ opacity, scale }}
      >
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <motion.h2 
            className="font-playfair-sc text-5xl md:text-6xl font-bold text-cafe-black mb-6 shimmer-heading"
            whileInView={{ scale: [0.9, 1] }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Our <span className="text-cafe-gold gradient-text-enhanced">Signature</span> Dishes
          </motion.h2>
          <motion.div 
            className="w-32 h-1.5 bg-gradient-to-r from-cafe-gold to-yellow-400 mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.p 
            className="text-cafe-brown text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed hover-text-glow font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Experience the authentic flavors of Chennai-style biryani, crafted with traditional spices and premium ingredients passed down through generations
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
          {/* Enhanced Image Section */}
          <motion.div 
            variants={fadeInUp}
            className="relative group order-2 lg:order-1"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl card-hover-enhanced">
              <motion.img
                src="/lovable-uploads/c97d2eb0-ed62-4acb-9a50-992ae468ed4a.png"
                alt="Premium Chennai-style Biryani with egg garnish served in traditional copper vessel"
                className="w-full h-[550px] object-cover transition-transform duration-700"
                whileHover={{ scale: 1.1 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cafe-black/70 via-transparent to-transparent" />
              
              {/* Enhanced overlay content */}
              <motion.div 
                className="absolute bottom-10 left-10 right-10 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <motion.h3 
                  className="text-cafe-white font-playfair-sc text-3xl font-bold mb-4 text-shadow-gold shimmer-overlay-text"
                  whileHover={{ scale: 1.05 }}
                >
                  Chennai Special Biryani
                </motion.h3>
                <p className="text-cafe-white/95 text-lg leading-relaxed">
                  Aromatic basmati rice layered with tender meat, slow-cooked with authentic spices and garnished with boiled eggs
                </p>
              </motion.div>

              {/* Animated corner accent */}
              <motion.div 
                className="absolute top-8 right-8 w-16 h-16 border-t-3 border-r-3 border-cafe-gold rounded-tr-lg"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.8, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                animate={{ rotate: [0, 5, 0] }}
              />
            </div>
          </motion.div>

          {/* Enhanced Content Section */}
          <motion.div variants={fadeInUp} className="space-y-10 order-1 lg:order-2">
            <div className="space-y-8">
              <motion.h3 
                className="font-playfair-sc text-4xl md:text-5xl font-bold text-cafe-black leading-tight"
                whileInView={{ x: [50, 0], opacity: [0, 1] }}
                transition={{ duration: 0.6 }}
              >
                Crafted with <span className="text-cafe-gold gradient-text-enhanced shimmer-accent">Authentic Tradition</span>
              </motion.h3>
              <motion.p 
                className="text-cafe-brown text-lg md:text-xl leading-relaxed font-medium hover-text-enhance"
                whileInView={{ x: [30, 0], opacity: [0, 1] }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Each biryani is a masterpiece, slow-cooked using traditional dum techniques passed down through generations. Our signature dishes feature premium basmati rice, tender meat, and a perfect blend of aromatic spices imported directly from Chennai.
              </motion.p>
            </div>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
            >
              {[
                { title: "Premium Ingredients", desc: "Fresh spices, aged basmati rice, and quality meat sourced with care" },
                { title: "Traditional Cooking", desc: "Slow-cooked using authentic dum method for perfect flavor infusion" }
              ].map((item, index) => (
                <motion.div 
                  key={item.title}
                  className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-cafe-gold/30 shadow-xl card-hover-micro"
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-cafe-gold to-yellow-400 rounded-xl flex items-center justify-center mb-6 shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div 
                      className="w-8 h-8 bg-white rounded-full shadow-inner"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  <h4 className="font-semibold text-cafe-black mb-4 text-xl font-playfair-sc hover-text-gold">{item.title}</h4>
                  <p className="text-cafe-brown text-base leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="pt-8"
              whileInView={{ y: [20, 0], opacity: [0, 1] }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/menu">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <GlowButton
                    className="bg-cafe-gold text-cafe-black hover:bg-cafe-gold/90 font-semibold text-xl px-12 py-5 rounded-2xl transition-all duration-300 button-shimmer shadow-xl"
                    glowColor="#E8C75D"
                    hasArrow
                  >
                    Explore Full Menu
                  </GlowButton>
                </motion.div>
              </Link>
            </motion.div>

            {/* Enhanced brand accent line */}
            <motion.div 
              className="flex items-center pt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.div 
                className="flex-1 h-px bg-gradient-to-r from-transparent via-cafe-gold/50 to-cafe-gold/30"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
              <motion.div 
                className="px-6 text-cafe-gold font-playfair-sc text-lg font-semibold shimmer-since"
                whileHover={{ scale: 1.1 }}
              >
                Since 2020
              </motion.div>
              <motion.div 
                className="flex-1 h-px bg-gradient-to-l from-transparent via-cafe-gold/50 to-cafe-gold/30"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default MenuHighlightsSection;
