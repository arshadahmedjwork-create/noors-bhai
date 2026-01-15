
import React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileOrderBar = () => {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border p-4 z-50 md:hidden"
    >
      <div className="flex gap-3">
        <a 
          href="https://www.ubereats.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
            Order Online
          </Button>
        </a>
        <a href="tel:+16473555671">
          <Button variant="outline" size="icon" className="border-primary text-primary">
            <Phone className="h-5 w-5" />
          </Button>
        </a>
      </div>
    </motion.div>
  );
};

export default MobileOrderBar;
