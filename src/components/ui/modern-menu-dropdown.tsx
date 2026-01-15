
import React, { useState } from "react";
import { ChevronDown, ChefHat, Utensils, Pizza, Salad, Star, Coffee, Cake, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MenuCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface ModernMenuDropdownProps {
  categories: MenuCategory[];
  onCategorySelect: (categoryId: string) => void;
}

const ModernMenuDropdown = ({ categories, onCategorySelect }: ModernMenuDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const categoryIcons = {
    "biryani-specials": { icon: ChefHat, color: "text-orange-500" },
    "combo-meals": { icon: Utensils, color: "text-blue-500" },
    "sides-gravies": { icon: Pizza, color: "text-red-500" },
    "appetizers": { icon: Salad, color: "text-green-500" },
    "street-food": { icon: Salad, color: "text-purple-500" },
    "burma-bazaar": { icon: Star, color: "text-yellow-500" },
    "add-ons": { icon: Check, color: "text-indigo-500" },
    "beverages": { icon: Coffee, color: "text-brown-500" },
    "desserts": { icon: Cake, color: "text-pink-500" }
  };

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId);
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-cafe-gold/10 to-cafe-brown/10 border-2 border-cafe-gold/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-cafe-gold focus:outline-none focus:ring-4 focus:ring-cafe-gold/20 backdrop-blur-sm"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-cafe-gold/20 rounded-full">
                <ChefHat className="w-6 h-6 text-cafe-gold" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-playfair font-semibold text-cafe-brown">
                  Browse Menu Categories
                </h3>
                <p className="text-sm text-cafe-brown/70">
                  Jump to any section instantly
                </p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="p-2 bg-cafe-gold/20 rounded-full"
            >
              <ChevronDown className="w-5 h-5 text-cafe-gold" />
            </motion.div>
          </motion.button>
        </DropdownMenuTrigger>

        <DropdownMenuContent 
          className="w-full min-w-[600px] max-w-2xl p-4 bg-white/95 backdrop-blur-md border border-cafe-gold/20 shadow-2xl rounded-2xl"
          align="center"
          sideOffset={8}
        >
          <DropdownMenuLabel className="text-center pb-3">
            <h4 className="text-xl font-playfair font-bold text-cafe-brown">
              🍽️ Menu Categories
            </h4>
            <p className="text-sm text-cafe-brown/60 mt-1">
              Select a category to explore our delicious offerings
            </p>
          </DropdownMenuLabel>
          
          <DropdownMenuSeparator className="my-3 bg-cafe-gold/20" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-96 overflow-y-auto">
            {categories.map((category, index) => {
              const iconData = categoryIcons[category.id as keyof typeof categoryIcons];
              const IconComponent = iconData?.icon || ChefHat;
              const iconColor = iconData?.color || "text-cafe-gold";

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <DropdownMenuItem
                    onClick={() => handleCategoryClick(category.id)}
                    className="p-4 rounded-xl hover:bg-cafe-gold/10 transition-all duration-200 cursor-pointer border border-transparent hover:border-cafe-gold/20 group"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="p-2 bg-cafe-gold/10 rounded-lg group-hover:bg-cafe-gold/20 transition-colors">
                        <IconComponent className={`w-5 h-5 ${iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-cafe-brown group-hover:text-cafe-gold transition-colors">
                          {category.title}
                        </h5>
                        <p className="text-xs text-cafe-brown/60 mt-1">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </motion.div>
              );
            })}
          </div>

          <DropdownMenuSeparator className="my-3 bg-cafe-gold/20" />
          
          <div className="text-center py-2">
            <p className="text-xs text-cafe-brown/60">
              All items under <span className="text-cafe-gold font-semibold">$15</span> • 
              Fresh • Authentic • Chennai-style
            </p>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ModernMenuDropdown;
