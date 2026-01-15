
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import GlowButton from "@/components/ui/glow-button";
import { fadeInUp, staggerContainer } from "@/utils/animations";

const CTASection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="bg-cafe-gold py-20 relative overflow-hidden">
      {/* Enhanced background pattern with parallax */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{ y: backgroundY }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cafe-black"
            style={{
              width: 150 + i * 80,
              height: 150 + i * 80,
              top: `${15 + i * 25}%`,
              left: `${5 + i * 35}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Animated floating elements */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cafe-black/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, -50],
              x: [null, Math.random() * 100 - 50],
              opacity: [0.2, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      <motion.div 
        className="container mx-auto px-4 relative z-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        style={{ opacity }}
      >
        <motion.div 
          variants={fadeInUp}
          className="text-center rounded-2xl shadow-xl glass-effect border border-cafe-black/10 backdrop-blur-sm bg-white/10 p-12 card-hover-enhanced"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold font-playfair-sc text-cafe-black mb-8 shimmer-heading"
            whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
            transition={{ duration: 0.6 }}
          >
            Experience Authentic Chennai Flavors Today
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="text-cafe-black/90 text-xl mb-10 max-w-2xl mx-auto leading-relaxed hover-text-enhance"
            whileInView={{ y: [20, 0], opacity: [0, 1] }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join us for a memorable dining experience or reserve our weekend buffet for an unforgettable culinary journey
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
          >
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="/reserve">
                <GlowButton
                  size="lg"
                  className="bg-cafe-black text-cafe-white hover:bg-cafe-black/90 text-lg px-10 py-4 transition-all duration-300 button-shimmer hover-scale-button"
                  glowColor="#0D0D0D"
                  hasArrow
                >
                  Reserve Buffet
                </GlowButton>
              </Link>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <a 
                href="https://www.ubereats.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <GlowButton
                  size="lg"
                  className="bg-cafe-black text-white hover:bg-cafe-black/90 text-lg px-10 py-4 transition-all duration-300"
                  glowColor="#0D0D0D"
                  hasArrow
                >
                  Order Online
                </GlowButton>
              </a>
            </motion.div>
          </motion.div>

          {/* Enhanced decorative elements */}
          <motion.div
            className="mt-8 flex justify-center space-x-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-cafe-black/30 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
