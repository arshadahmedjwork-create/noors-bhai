
import React from "react";
import { motion } from "framer-motion";
import MenuItem from "./MenuItem";

interface MenuItemData {
  name: string;
  price: string;
  description?: string;
  availability?: string;
  servedWith?: string;
  tags?: string[];
}

interface MenuSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  items: MenuItemData[];
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  chefNote?: string;
}

const MenuSection = ({ id, title, subtitle, items, image, imageAlt, imageCaption, chefNote }: MenuSectionProps) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="scroll-mt-32 mb-12"
    >
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-playfair font-bold text-foreground">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground mt-1">
            {subtitle}
          </p>
        )}
      </div>
      
      {/* Content with optional image */}
      <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50">
        <div className={`flex flex-col ${image ? 'lg:flex-row' : ''} gap-6`}>
          {/* Menu Items */}
          <div className={image ? 'lg:w-2/3' : 'w-full'}>
            {items.map((item, index) => (
              <MenuItem
                key={`${id}-${item.name}`}
                name={item.name}
                description={item.description}
                price={item.price}
                availability={item.availability}
                servedWith={item.servedWith}
                tags={item.tags}
                index={index}
              />
            ))}
          </div>
          
          {/* Image */}
          {image && (
            <div className="lg:w-1/3">
              <div className="rounded-lg overflow-hidden shadow-md border border-primary/20 sticky top-32">
                <img 
                  src={image}
                  alt={imageAlt || title}
                  className="w-full h-auto object-cover aspect-square"
                />
                {imageCaption && (
                  <div className="bg-card/90 backdrop-blur-sm text-foreground p-3 text-center text-sm border-t border-border">
                    <p>{imageCaption}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Chef's Note */}
        {chefNote && (
          <div className="mt-6 bg-primary/5 p-4 rounded-lg border border-primary/10">
            <p className="text-muted-foreground font-medium italic text-sm">
              <span className="text-primary font-bold">Chef's Note:</span> {chefNote}
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default MenuSection;
