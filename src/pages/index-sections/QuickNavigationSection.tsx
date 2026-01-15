
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Menu, Phone, MapPin } from "lucide-react";
import { ScrollSection } from "@/components/ui/scroll-section";
import { SectionTransition } from "@/components/ui/section-transition";
import { EnhancedAnimatedSection } from "@/components/ui/enhanced-animated-section";

const QuickNavigationSection = () => {
  const navItems = [
    {
      icon: <Menu className="w-8 h-8" />,
      title: "Explore Menu",
      description: "Discover our authentic biryani varieties",
      link: "/menu",
      color: "from-cafe-gold to-yellow-500"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Reserve Table",
      description: "Book your weekend buffet experience",
      link: "/reserve",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Contact Us",
      description: "Get in touch for special requests",
      link: "/contact",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Location",
      description: "Find us in the heart of Mississauga",
      link: "/contact",
      color: "from-blue-500 to-indigo-500"
    }
  ];

  return (
    <>
      <SectionTransition type="spice-trail" direction="down" color="gold" />
      
      <ScrollSection 
        className="py-16 bg-gradient-to-br from-cafe-black via-cafe-brown/20 to-cafe-black"
        triggerAnimation="fadeUp"
      >
        <div className="container mx-auto px-4">
          <EnhancedAnimatedSection 
            animation="fadeInUp" 
            className="text-center mb-12"
            delay={0.2}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-cafe-gold mb-4 text-glow">
              Quick Actions
            </h2>
            <p className="text-cafe-white/90 text-lg max-w-2xl mx-auto">
              Everything you need for the perfect dining experience
            </p>
          </EnhancedAnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {navItems.map((item, index) => (
              <EnhancedAnimatedSection
                key={item.title}
                animation="scaleIn"
                delay={index * 0.2}
                className="group"
              >
                <Link to={item.link}>
                  <motion.div
                    className="glass-effect rounded-2xl p-6 text-center hover-glow transition-all duration-500 border border-cafe-gold/20"
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 5,
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white shadow-lg`}
                      whileHover={{ 
                        rotate: 360,
                        transition: { duration: 0.6 }
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    
                    <h3 className="text-xl font-semibold text-cafe-gold mb-2 group-hover:text-glow transition-all duration-300">
                      {item.title}
                    </h3>
                    
                    <p className="text-cafe-white/80 text-sm group-hover:text-cafe-white transition-colors duration-300">
                      {item.description}
                    </p>
                    
                    {/* Hover Effect Line */}
                    <motion.div
                      className="mt-4 h-0.5 bg-gradient-to-r from-transparent via-cafe-gold to-transparent"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </Link>
              </EnhancedAnimatedSection>
            ))}
          </div>
        </div>
      </ScrollSection>
      
      <SectionTransition type="gradient-wave" direction="down" color="gradient" />
    </>
  );
};

export default QuickNavigationSection;
