
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import GlowButton from "@/components/ui/glow-button";
import { heroTextAnimation, staggerContainer, fadeInUp } from "@/utils/animations";

const HeroSection = () => {
  const [typewriterText, setTypewriterText] = useState("");
  const fullText = "The King of Flavour";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypewriterText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] bg-cafe-black flex items-center overflow-hidden">
      {/* Enhanced background with zoom effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cafe-black/70 via-cafe-black/50 to-cafe-black/30 z-10" />
      
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-zoom-effect"
        initial={{ scale: 1.1 }}
        animate={{ scale: [1.1, 1.05, 1.1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{ 
          backgroundImage: "url('/lovable-uploads/faa50c97-7d5e-4ee9-a401-94daf538ba84.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center"
        }}
      />
      
      {/* Floating particles with subtle animation */}
      <div className="absolute inset-0 z-5 opacity-30">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0 ? 'w-2 h-2 bg-cafe-gold' : 
              i % 3 === 1 ? 'w-1.5 h-1.5 bg-orange-400' : 
              'w-1 h-1 bg-yellow-300'
            }`}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.6 + 0.3
            }}
            animate={{ 
              y: [null, Math.random() * -80 - 20],
              x: [null, Math.random() * 40 - 20],
              opacity: [null, 0]
            }}
            transition={{ 
              duration: Math.random() * 15 + 10, 
              repeat: Infinity, 
              delay: Math.random() * 8,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      <motion.div 
        className="container mx-auto px-4 relative z-20"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          variants={fadeInUp}
          className="max-w-2xl glass-effect shadow-xl rounded-xl p-8 bg-white/5 backdrop-blur-md border border-cafe-gold/20"
        >
          <motion.div
            className="mb-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1.5 bg-cafe-gold/15 text-cafe-gold rounded-full text-xs font-medium border border-cafe-gold/30 shimmer-badge">
              ✨ Authentic Biryani Experience
            </span>
          </motion.div>
          
          {/* Enhanced Hero Title with Typewriter and Shimmer Effects */}
          <motion.h1 
            variants={heroTextAnimation}
            className="font-playfair-sc text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
          >
            <span className="shimmer-text gradient-hero-text">
              {typewriterText}
              <motion.span
                className="typewriter-cursor"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                |
              </motion.span>
            </span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-cafe-white/90 text-lg md:text-xl mb-6 leading-relaxed hover-glow-text"
          >
            Experience the rich heritage of authentic Biryani at Mississauga's premier destination for culinary excellence
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/reserve">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group"
              >
                <GlowButton
                  className="bg-cafe-gold text-cafe-black hover:bg-cafe-gold/90 font-semibold text-base px-8 py-4 transition-all duration-300 hover-scale-button"
                  glowColor="#E8C75D"
                  hasArrow
                >
                  Reserve Your Table
                </GlowButton>
              </motion.div>
            </Link>
            <Link to="/menu">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group"
              >
                <GlowButton
                  variant="outline" 
                  className="border-2 border-cafe-gold text-cafe-gold hover:bg-cafe-gold/10 font-semibold text-base px-8 py-4 transition-all duration-300 hover-glow-border"
                  glowColor="#E8C75D"
                  hasArrow
                >
                  Explore Menu
                </GlowButton>
              </motion.div>
            </Link>
          </motion.div>
          
          {/* Enhanced tagline with shimmer */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <p className="text-cafe-gold/70 text-xs italic font-light tracking-wider shimmer-tagline">
              "Where tradition meets perfection, one grain at a time"
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-cafe-gold/50 rounded-full flex justify-center hover-pulse"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            className="w-1 h-3 bg-cafe-gold rounded-full mt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
