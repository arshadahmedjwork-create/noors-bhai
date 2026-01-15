
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MenuSectionCardProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  index?: number;
}

const MenuSectionCard = ({ 
  id, 
  icon, 
  title, 
  subtitle, 
  children, 
  className,
  index = 0
}: MenuSectionCardProps) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        "mb-16 scroll-mt-20 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-cafe-gold/10",
        className
      )}
    >
      {/* Section Header */}
      <div className="bg-gradient-to-r from-cafe-gold/5 to-cafe-brown/5 px-6 md:px-8 py-6 border-b border-cafe-gold/10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <div className="p-3 bg-cafe-gold/20 rounded-2xl">
            {icon}
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-cafe-brown tracking-wide">
              {title}
            </h2>
            {subtitle && (
              <p className="text-cafe-brown/70 mt-1 font-medium">
                {subtitle}
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Section Content */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="p-6 md:p-8"
      >
        {children}
      </motion.div>
    </motion.section>
  );
};

export default MenuSectionCard;
