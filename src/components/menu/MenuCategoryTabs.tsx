
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MenuCategory {
  id: string;
  title: string;
}

interface MenuCategoryTabsProps {
  categories: MenuCategory[];
  activeCategory: string;
  onCategorySelect: (categoryId: string) => void;
  triggerOffset?: number;
}

const MenuCategoryTabs = ({ categories, activeCategory, onCategorySelect, triggerOffset = 400 }: MenuCategoryTabsProps) => {
  const [isSticky, setIsSticky] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Only show sticky nav when user has scrolled past the trigger offset
      setIsSticky(window.scrollY > triggerOffset);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, [triggerOffset]);

  // Auto-scroll active tab into view
  useEffect(() => {
    if (tabsRef.current) {
      const activeButton = tabsRef.current.querySelector(`[data-category="${activeCategory}"]`);
      if (activeButton) {
        activeButton.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [activeCategory]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: isSticky ? 1 : 0, 
        y: isSticky ? 0 : -20,
        pointerEvents: isSticky ? "auto" : "none"
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-background/95 backdrop-blur-md border-b border-border shadow-lg py-3"
      )}
    >
      <div className="container mx-auto px-4">
        <div 
          ref={tabsRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 snap-x snap-mandatory"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              data-category={category.id}
              onClick={() => onCategorySelect(category.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 snap-start",
                "flex-shrink-0",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              {category.title}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCategoryTabs;
