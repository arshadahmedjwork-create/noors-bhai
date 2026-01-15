import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/utils/animations";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
}

/**
 * Premium Section Header Component
 * Consistent styling for all section headers across the site
 */
const SectionHeader = ({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  align = "center",
  dark = true
}: SectionHeaderProps) => {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  
  return (
    <motion.div
      className={`mb-12 md:mb-16 lg:mb-20 max-w-3xl ${alignClass}`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <motion.span
          variants={fadeInUp}
          className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4"
        >
          {eyebrow}
        </motion.span>
      )}

      {/* Title */}
      <motion.h2
        variants={fadeInUp}
        className={`text-3xl md:text-4xl lg:text-5xl font-bold font-playfair leading-tight mb-4 ${
          dark ? "text-cafe-white" : "text-cafe-black"
        }`}
      >
        {title}
        {titleAccent && (
          <span className="text-primary"> {titleAccent}</span>
        )}
      </motion.h2>

      {/* Decorative line */}
      <motion.div
        variants={fadeInUp}
        className={`flex items-center gap-3 mb-6 ${align === "center" ? "justify-center" : ""}`}
      >
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
      </motion.div>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          variants={fadeInUp}
          className={`text-lg md:text-xl leading-relaxed ${
            dark ? "text-cafe-white/70" : "text-cafe-black/70"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
