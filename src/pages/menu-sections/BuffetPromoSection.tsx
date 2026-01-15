
import { motion } from "framer-motion";
import VanillaTiltWrapper from "@/components/ui/vanilla-tilt-wrapper";

const BuffetPromoSection = () => (
  <section className="relative bg-cafe-black/90 py-10 md:py-14 px-2 md:px-0 flex justify-center items-center overflow-hidden">
    {/* Background glow effect */}
    <motion.div 
      className="absolute inset-0 opacity-30"
      animate={{
        background: [
          "radial-gradient(circle at 30% 50%, rgba(232, 199, 93, 0.3) 0%, transparent 60%)",
          "radial-gradient(circle at 70% 50%, rgba(232, 199, 93, 0.3) 0%, transparent 60%)",
          "radial-gradient(circle at 30% 50%, rgba(232, 199, 93, 0.3) 0%, transparent 60%)"
        ]
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
    
    {/* Floating particles */}
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-cafe-gold"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 1.5, 1]
        }}
        transition={{
          duration: Math.random() * 3 + 3,
          repeat: Infinity,
          delay: Math.random() * 2
        }}
      />
    ))}
    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      <VanillaTiltWrapper 
        className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-xl border-4 border-cafe-gold/60 bg-gradient-to-b from-cafe-black/80 to-cafe-black/60 glass-effect hover:shadow-2xl transition-all duration-300 cursor-pointer" 
        options={{ scale: 1.08, glare: true, "max-glare": 0.22, speed: 500 }}
      >
        <motion.img
          src="/lovable-uploads/e7aa2b19-6781-42de-8219-ab6c2a127b10.png"
          alt="Noor's Bhai Biryani Iftar Buffet Menu"
          className="w-full h-auto object-contain !bg-transparent drop-shadow-lg rounded-2xl"
          style={{
            minHeight: '320px',
            background: 'radial-gradient(rgba(48,39,6,0.7) 55%, transparent 100%)'
          }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        />
      </VanillaTiltWrapper>
      
      <motion.div 
        className="absolute -top-6 left-1/2 -translate-x-1/2 bg-cafe-gold text-cafe-black rounded-full px-6 py-2 shadow-lg font-bold tracking-wide text-lg z-30 border-2 border-cafe-black/20 glass-effect"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        IFTAR BUFFET - See Our Special Menu!
      </motion.div>
    </motion.div>
  </section>
);

export default BuffetPromoSection;
