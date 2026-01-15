
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MenuItemProps {
  name: string;
  description?: string;
  price: string;
  availability?: string;
  servedWith?: string;
  tags?: string[];
  index?: number;
}

const MenuItem = ({ 
  name, 
  description, 
  price, 
  availability,
  servedWith,
  tags = [],
  index = 0 
}: MenuItemProps) => {
  const isWeekendOnly = availability === "Weekends";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className="group py-4 border-b border-border/50 last:border-0"
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left side: Name, description, tags */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h4>
            {tags.map((tag) => (
              <span 
                key={tag}
                className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full"
              >
                {tag}
              </span>
            ))}
            {isWeekendOnly && (
              <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full">
                Weekends
              </span>
            )}
          </div>
          
          {(description || servedWith) && (
            <p className="text-sm text-muted-foreground mt-1">
              {servedWith ? `Served with ${servedWith}` : description}
            </p>
          )}
        </div>
        
        {/* Right side: Price pill */}
        <div className="flex-shrink-0">
          <span className="inline-block px-3 py-1 bg-muted text-foreground font-medium text-sm rounded-full">
            {price}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuItem;
