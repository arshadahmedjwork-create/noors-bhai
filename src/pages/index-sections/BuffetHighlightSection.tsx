
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/utils/animations";

const BuffetHighlightSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={sectionRef}
      className="py-24 relative bg-cover bg-center bg-fixed overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(rgba(13, 13, 13, 0.75), rgba(13, 13, 13, 0.65)), url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop')"
      }}
    >
      {/* Animated background overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-cafe-black/80 via-cafe-black/60 to-cafe-black/40"
        style={{ y }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cafe-gold/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -100],
              opacity: [0.3, 0.7, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ opacity }}
        >
          <motion.div 
            variants={fadeInUp}
            className="glass-effect shadow-2xl rounded-2xl border border-cafe-gold/20 bg-white/5 backdrop-blur-md p-12 card-hover-enhanced"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold font-playfair-sc text-cafe-gold mb-6 shimmer-heading"
              whileInView={{ scale: [0.9, 1] }}
              transition={{ duration: 0.6 }}
            >
              Weekend Buffet Experience
            </motion.h2>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-cafe-white mb-10 leading-relaxed hover-glow-text"
              whileInView={{ y: [20, 0], opacity: [0, 1] }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join us every Saturday and Sunday for our extensive South Indian buffet featuring authentic flavors and traditional recipes.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="mb-10 inline-block border-2 border-cafe-gold/50 rounded-xl px-8 py-6 bg-cafe-black/20 hover-glow-border"
              whileHover={{ scale: 1.05, borderColor: "#ffd700" }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-cafe-white text-center">
                <motion.p 
                  className="font-semibold mb-4 text-cafe-gold text-lg shimmer-accent"
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ delay: 0.4 }}
                >
                  Available Sessions:
                </motion.p>
                <motion.div 
                  className="grid grid-cols-2 gap-3"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                >
                  {["12:30 PM – 2:00 PM", "2:30 PM – 4:00 PM", "6:30 PM – 8:00 PM", "8:30 PM – 10:00 PM"].map((time, index) => (
                    <motion.p 
                      key={time}
                      className="text-sm bg-cafe-gold/10 py-2 px-3 rounded-lg card-hover-micro"
                      variants={fadeInUp}
                      whileHover={{ 
                        backgroundColor: "rgba(232, 199, 93, 0.2)",
                        scale: 1.05 
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {time}
                    </motion.p>
                  ))}
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              whileInView={{ y: [30, 0], opacity: [0, 1] }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link to="/reserve">
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-cafe-gold text-cafe-black hover:bg-cafe-gold/90 text-lg px-10 py-4 rounded-xl transition-all duration-300 button-shimmer hover-scale-button"
                  >
                    Reserve Your Table
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BuffetHighlightSection;
