
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Calendar, Phone, ChevronLeft, ChevronRight } from "lucide-react";

const FloatingQuickAccess = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const quickActions = [
    {
      icon: <Menu className="w-5 h-5" />,
      title: "Menu",
      link: "/menu",
      color: "from-cafe-gold to-cafe-brown"
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Reserve",
      link: "/reserve",
      color: "from-cafe-brown to-cafe-black"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Contact",
      link: "/contact",
      color: "from-cafe-black to-cafe-gold"
    }
  ];

  return (
    <motion.div
      className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50"
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div className="flex items-center">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="flex flex-col gap-3 mr-3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={action.link}>
                    <motion.div
                      className={`flex items-center gap-3 bg-gradient-to-r ${action.color} text-cafe-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 min-w-[140px] border border-cafe-gold/20`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex-shrink-0">
                        {action.icon}
                      </div>
                      <span className="text-sm font-medium whitespace-nowrap">
                        {action.title}
                      </span>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-cafe-gold text-cafe-black p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-cafe-gold/90 border border-cafe-black/10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isExpanded ? 180 : 0 }}
        >
          {isExpanded ? (
            <ChevronRight className="w-6 h-6" />
          ) : (
            <ChevronLeft className="w-6 h-6" />
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FloatingQuickAccess;
