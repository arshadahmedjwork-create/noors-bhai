
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MenuCategoryTabs from "@/components/menu/MenuCategoryTabs";
import MenuSection from "@/components/menu/MenuSection";
import MobileOrderBar from "@/components/menu/MobileOrderBar";
import { Button } from "@/components/ui/button";

// Menu data with images - preserving all existing items exactly as they were
const menuData = {
  "biryani-specials": {
    title: "Biryani Specials",
    subtitle: "Authentic Chennai-style biryanis with aromatic spices",
    image: "/lovable-uploads/e8379e1b-ff29-4d0f-a3b3-4791e63f30eb.png",
    imageAlt: "Traditional biryani preparation with authentic spices and garnish",
    imageCaption: "Traditional biryani garnished with fried onions and herbs",
    chefNote: "Our signature biryanis are prepared using a special blend of spices imported directly from Chennai, India. Each biryani is layered and slow-cooked to perfection in traditional clay pots.",
    items: [
      { name: "Chicken Biryani", price: "$12.99 / $19.99", description: "Served with Boiled Egg, Brinjal Chutney, Onion Raitha", availability: "All Days", tags: ["Bestseller"] },
      { name: "Veg Biryani", price: "$9.99 / $19.99", description: "Served with Brinjal Chutney, Onion Raitha", availability: "Weekends" },
      { name: "Goat Biryani", price: "$14.99 / $29.99", description: "Served with Boiled Egg, Brinjal Chutney, Onion Raitha", availability: "Sunday Special", tags: ["Chef Special"] },
    ]
  },
  "combo-meals": {
    title: "Combo Meals",
    subtitle: "Complete meal combinations for the perfect dining experience",
    image: "/lovable-uploads/db012785-5e4c-438e-b89c-3e1b9106b8ff.png",
    imageAlt: "Traditional South Indian combo meal with various accompaniments",
    imageCaption: "Complete meal combos with authentic accompaniments",
    items: [
      { name: "Parotta (2pcs)", price: "$9.99", servedWith: "Empty Salna", availability: "All Days" },
      { name: "Kal Dosa (2pcs)", price: "$14.99", servedWith: "Chicken / Veg Gravy", availability: "All Days" },
      { name: "Idiyappam (3pcs)", price: "$14.99", servedWith: "Paya", availability: "Weekends" },
      { name: "Idly (2pcs)", price: "$12.99", servedWith: "Chicken / Veg Gravy", availability: "All Days" },
      { name: "Veg Pulav (Nei Soru)", price: "$12.99", servedWith: "Chicken / Veg Gravy", availability: "Weekends" },
    ]
  },
  "sides-gravies": {
    title: "Sides & Gravies",
    subtitle: "Perfect accompaniments to complement your main course",
    image: "/lovable-uploads/4331a91c-8627-4873-b747-6f01e4f16e83.png",
    imageAlt: "Rich and aromatic South Indian curry with traditional brass serving bowl",
    imageCaption: "Traditional South Indian gravies and curries",
    chefNote: "Our gravies are slow-cooked with traditional spices and served in authentic brass vessels to enhance the dining experience.",
    items: [
      { name: "Empty Salna", price: "$7.99", availability: "All Days" },
      { name: "Mixed Veg Gravy", price: "$9.99", availability: "All Days" },
      { name: "Chicken Gravy", price: "$9.99", availability: "All Days" },
      { name: "Paya", price: "$14.99", availability: "Weekends" },
      { name: "Kudal Gravy", price: "$14.99", availability: "Weekends" },
      { name: "Pepper Chicken", price: "$14.99", availability: "All Days", tags: ["Spicy"] },
      { name: "Tawa Kheema Chicken", price: "$12.99", availability: "All Days" },
      { name: "Lamb Gravy", price: "$14.99", availability: "Weekends" },
      { name: "Kadai Masala", price: "$14.99", availability: "Weekends" },
      { name: "Prawn Masala", price: "$14.99", availability: "Weekends" },
    ]
  },
  "appetizers": {
    title: "Appetizers",
    subtitle: "Start your culinary journey with these delicious bites",
    image: "/lovable-uploads/d044f0ad-1809-437f-88f7-038ac57d4826.png",
    imageAlt: "Spicy chicken appetizers with traditional South Indian spices",
    imageCaption: "Authentic Chicken 65 and spiced appetizers",
    chefNote: "Our appetizers are marinated with traditional South Indian spices and cooked to perfection, offering the perfect start to your meal.",
    items: [
      { name: "Chicken 65 (Bone-In)", price: "$9.99", description: "Crispy fried chicken with South Indian spices", availability: "All Days", tags: ["Bestseller"] },
      { name: "Chicken 65 (Boneless)", price: "$12.99", description: "Crispy boneless chicken with aromatic spices", availability: "All Days" },
      { name: "Cauliflower 65", price: "$12.99", description: "Crispy cauliflower florets with traditional masala", availability: "All Days" },
      { name: "Prawn 65", price: "$12.99", description: "Crispy prawns with South Indian spices", availability: "Weekends" },
      { name: "Fish Fry", price: "Market Price", description: "Fresh fish fried to perfection", availability: "Weekends" },
    ]
  },
  "street-food": {
    title: "Street Food Vibes",
    subtitle: "Authentic street flavors from the heart of Chennai",
    image: "/lovable-uploads/bfadcbd1-afe6-413c-9246-866494a9ca98.png",
    imageAlt: "Chennai street food specialties",
    imageCaption: "Authentic Chennai street food favorites",
    items: [
      { name: "Kalaan", price: "$9.99", description: "Traditional mushroom curry street style", availability: "Weekends" },
      { name: "Masala Puri", price: "$9.99", description: "Crispy puris with spiced potato masala", availability: "Weekends" },
      { name: "Pani Puri", price: "$9.99", description: "Hollow puris with tangy flavored water", availability: "Weekends" },
    ]
  },
  "burma-bazaar": {
    title: "Burma Bazaar Specials",
    subtitle: "Unique Burma-style dishes with traditional recipes",
    image: "/lovable-uploads/c97d2eb0-ed62-4acb-9a50-992ae468ed4a.png",
    imageAlt: "Burma Bazaar specialty dishes",
    imageCaption: "Authentic Burma Bazaar inspired dishes",
    items: [
      { name: "Atho Noodles", price: "$12.99", description: "Burmese-style noodles with vegetables", availability: "Weekends" },
      { name: "Kara Muttai (Spicy Egg)", price: "$2.99", description: "Spiced hard-boiled egg street style", availability: "All Days" },
    ]
  },
  "add-ons": {
    title: "Add-ons",
    subtitle: "Per Piece, Not Sold Separately - Extra touches for your meal",
    image: "/lovable-uploads/20fd1e09-a349-489e-a640-076cbd5bf14b.png",
    imageAlt: "Traditional South Indian accompaniments",
    imageCaption: "Perfect additions to complete your meal",
    items: [
      { name: "Idly", price: "$2.49", availability: "All Days" },
      { name: "Kal Dosai", price: "$4.99", availability: "All Days" },
      { name: "Parotta", price: "$4.99", availability: "All Days" },
      { name: "Idiyappam", price: "$1.99", availability: "Weekends" },
      { name: "Boiled Egg", price: "$1.99", availability: "All Days" },
      { name: "Raitha", price: "$1.99", availability: "All Days" },
      { name: "Brinjal Chutney", price: "$2.99", availability: "All Days" },
    ]
  },
  "beverages": {
    title: "Beverages",
    subtitle: "Refreshing drinks to complement your dining experience",
    image: "/lovable-uploads/faa50c97-7d5e-4ee9-a401-94daf538ba84.png",
    imageAlt: "Traditional Indian beverages",
    imageCaption: "Refreshing traditional beverages",
    items: [
      { name: "Rosemilk", price: "$5.49", description: "Sweet rose-flavored milk", availability: "All Days" },
      { name: "Nannari Sharbat", price: "$4.49", description: "Traditional herbal refreshment", availability: "All Days" },
      { name: "Lime Soda", price: "$4.49", description: "Fresh lime with soda", availability: "All Days" },
      { name: "Mango Lassi", price: "$7.49", description: "Creamy mango yogurt drink", availability: "All Days" },
      { name: "Water", price: "$2.99", availability: "All Days" },
      { name: "Pop (Soft Drink)", price: "$2.99", availability: "All Days" },
    ]
  },
  "desserts": {
    title: "Desserts",
    subtitle: "Sweet endings to complete your perfect meal",
    image: "/lovable-uploads/44128c4b-b4c4-4587-b563-ea93e983a11c.png",
    imageAlt: "Traditional Indian desserts",
    imageCaption: "Authentic Indian sweets and desserts",
    items: [
      { name: "Bread Halwa", price: "$2.99", description: "Sweet bread pudding with cardamom", availability: "All Days" },
      { name: "Kesari", price: "$2.99", description: "Semolina pudding with saffron", availability: "All Days" },
      { name: "Kheer", price: "$3.99", description: "Creamy rice pudding with nuts", availability: "All Days" },
      { name: "Gulab Jamun", price: "$1.99", description: "Fried milk dumplings in sugar syrup", availability: "All Days", tags: ["Bestseller"] },
      { name: "Shahi Tukra", price: "$9.99", description: "Royal bread pudding with rabri", availability: "All Days", tags: ["Chef Special"] },
    ]
  }
};

const categoryOrder = [
  "biryani-specials",
  "combo-meals", 
  "sides-gravies",
  "appetizers",
  "street-food",
  "burma-bazaar",
  "add-ons",
  "beverages",
  "desserts"
];

const MenuCategoriesSection = () => {
  const [activeCategory, setActiveCategory] = useState("biryani-specials");

  const categories = categoryOrder.map(id => ({
    id,
    title: menuData[id as keyof typeof menuData].title
  }));

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      const yOffset = -100; // Account for sticky nav
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = categoryOrder.map(id => document.getElementById(id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveCategory(categoryOrder[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-8 md:py-12 bg-background min-h-screen">
      {/* Sticky Category Tabs - appears when scrolling past hero */}
      <MenuCategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategorySelect={handleCategorySelect}
        triggerOffset={350}
      />

      <div className="container mx-auto px-4 max-w-5xl mt-8">
        {/* All Items Under $15 badge */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-6 py-2 bg-primary/10 text-primary font-semibold rounded-full text-sm">
            All Items Under $15
          </span>
        </motion.div>

        {/* Menu Sections with Images */}
        {categoryOrder.map((categoryId) => {
          const section = menuData[categoryId as keyof typeof menuData];
          return (
            <MenuSection
              key={categoryId}
              id={categoryId}
              title={section.title}
              subtitle={section.subtitle}
              items={section.items}
              image={section.image}
              imageAlt={section.imageAlt}
              imageCaption={section.imageCaption}
              chefNote={'chefNote' in section ? section.chefNote : undefined}
            />
          );
        })}

        {/* Footer CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-card rounded-2xl p-8 border border-border shadow-sm"
        >
          <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
            Ready to Experience Authentic Chennai Flavors?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Visit us today and taste the difference that authentic ingredients and traditional recipes make.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://www.ubereats.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3">
                Order Online
              </Button>
            </a>
            <a href="/contact">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-3">
                View Location
              </Button>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Mobile Order Bar */}
      <MobileOrderBar />
      
      {/* Spacer for mobile order bar */}
      <div className="h-20 md:hidden" />
    </section>
  );
};

export default MenuCategoriesSection;
