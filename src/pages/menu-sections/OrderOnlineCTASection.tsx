
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import GlowButton from "@/components/ui/glow-button";
import { fadeInUp, staggerContainer } from "@/utils/animations";

const OrderOnlineCTASection = () => (
  <section className="py-16 bg-cafe-gold relative overflow-hidden">
    {/* Background pattern */}
    <div className="absolute inset-0 pointer-events-none">
      <svg width="100%" height="100%" className="opacity-10">
        <defs>
          <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 20 L40 20 M20 0 L20 40" stroke="#0D0D0D" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pattern)" />
      </svg>
    </div>

    {/* Floating food icons */}
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-cafe-black/20 opacity-30"
        style={{
          fontSize: `${Math.random() * 40 + 20}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          rotate: [0, 360],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: Math.random() * 10 + 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {["🍚", "🍛", "🍲", "🥘", "🍜"][Math.floor(Math.random() * 5)]}
      </motion.div>
    ))}

    <motion.div 
      className="container mx-auto px-4 text-center relative z-10"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.h2 
        variants={fadeInUp}
        className="text-3xl font-bold font-playfair text-cafe-black mb-6 drop-shadow-sm"
      >
        Enjoy Our Delicious Food at Home
      </motion.h2>
      
      <motion.p 
        variants={fadeInUp}
        className="text-cafe-black/90 mb-8 max-w-2xl mx-auto"
      >
        Order online through Uber Eats for delivery or pickup
      </motion.p>
      
      <motion.div
        variants={fadeInUp}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <a
          href="https://www.ubereats.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <GlowButton 
            size="lg" 
            className="bg-cafe-black text-cafe-white hover:bg-cafe-black/90"
            glowColor="#0D0D0D"
          >
            <ShoppingCart className="mr-2 h-5 w-5" /> Order on Uber Eats
          </GlowButton>
        </a>
      </motion.div>
    </motion.div>
  </section>
);

export default OrderOnlineCTASection;
