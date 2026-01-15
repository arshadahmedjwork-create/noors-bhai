
import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuCategory {
  id: string;
  title: string;
  description?: string;
}

interface MenuSearchDropdownProps {
  categories: MenuCategory[];
  onCategorySelect: (categoryId: string) => void;
  placeholder?: string;
}

const MenuSearchDropdown = ({ 
  categories, 
  onCategorySelect, 
  placeholder = "Search Menu Categories..." 
}: MenuSearchDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter categories based on search term
  useEffect(() => {
    const filtered = categories.filter(category =>
      category.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative w-full max-w-md mx-auto" ref={dropdownRef}>
      {/* Search Input Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border-2 border-cafe-gold/30 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:border-cafe-gold focus:outline-none focus:ring-2 focus:ring-cafe-gold/50"
      >
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-cafe-gold" />
          <span className="text-cafe-brown font-medium">
            {searchTerm || "Find Your Favorite Dish"}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-cafe-gold" />
        </motion.div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-cafe-gold/20 rounded-lg shadow-xl z-50 overflow-hidden"
          >
            {/* Search Input */}
            <div className="p-3 border-b border-cafe-gold/10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cafe-brown/60" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={placeholder}
                  className="w-full pl-10 pr-4 py-2 border border-cafe-gold/20 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-gold/50 text-sm"
                  autoFocus
                />
              </div>
            </div>

            {/* Category List */}
            <div className="max-h-64 overflow-y-auto">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleCategoryClick(category.id)}
                    className="w-full text-left px-4 py-3 hover:bg-cafe-gold/10 transition-colors duration-200 border-b border-cafe-gold/5 last:border-b-0 group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-cafe-brown font-medium group-hover:text-cafe-gold transition-colors">
                          {category.title}
                        </h4>
                        {category.description && (
                          <p className="text-xs text-cafe-brown/60 mt-1">
                            {category.description}
                          </p>
                        )}
                      </div>
                      <ChevronUp className="w-4 h-4 text-cafe-gold opacity-0 group-hover:opacity-100 transition-opacity transform rotate-90" />
                    </div>
                  </motion.button>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-cafe-brown/60">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No categories found</p>
                  <p className="text-xs mt-1">Try a different search term</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-cafe-gold/5 border-t border-cafe-gold/10">
              <p className="text-xs text-cafe-brown/60 text-center">
                {filteredCategories.length} of {categories.length} categories
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuSearchDropdown;
