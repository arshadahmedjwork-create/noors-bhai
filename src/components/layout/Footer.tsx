import { Link } from "react-router-dom";
import { Instagram, Phone, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/utils/animations";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/reserve", label: "Reserve Buffet" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" }
];

const Footer = () => {
  return (
    <footer className="bg-cafe-black border-t border-primary/10">
      {/* CTA Section */}
      <div className="py-16 md:py-20 bg-gradient-to-b from-cafe-black to-cafe-brown/10">
        <motion.div
          className="container mx-auto px-4 md:px-6 max-w-4xl text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h3
            variants={fadeInUp}
            className="text-2xl md:text-3xl lg:text-4xl font-bold font-playfair text-cafe-white mb-4"
          >
            Ready for Authentic <span className="text-primary">Chennai Flavors</span>?
          </motion.h3>
          <motion.p
            variants={fadeInUp}
            className="text-cafe-white/70 text-lg mb-8 max-w-2xl mx-auto"
          >
            Visit us or order online for the most authentic biryani experience in Mississauga.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://www.ubereats.com/store/noors-bhai-biryani/wHNQVQWfXxuTOBYR6N2Y_w"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-primary text-cafe-black hover:bg-primary/90 font-semibold px-8 py-4 rounded-full">
                Order on Uber Eats
              </Button>
            </a>
            <a href="https://wa.me/16473555671" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 font-semibold px-8 py-4 rounded-full"
              >
                WhatsApp Order
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12 md:py-16 border-t border-primary/10">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link to="/" className="inline-block mb-4">
                <img
                  src="/assets/noors-logo.png"
                  alt="Noor's Bhai Biryani"
                  className="h-12 w-auto"
                />
              </Link>
              <p className="text-cafe-white/60 text-sm leading-relaxed mb-6">
                Authentic Chennai-style biryani bringing premium flavors to Mississauga since day one.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/NOORS_BHAI_BIRYANI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-cafe-white/5 flex items-center justify-center text-cafe-white/60 hover:bg-primary/20 hover:text-primary transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="tel:+16473555671"
                  className="w-10 h-10 rounded-full bg-cafe-white/5 flex items-center justify-center text-cafe-white/60 hover:bg-primary/20 hover:text-primary transition-all duration-300"
                  aria-label="Phone"
                >
                  <Phone size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-primary font-semibold uppercase tracking-wider text-sm mb-5">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-cafe-white/60 hover:text-primary transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h4 className="text-primary font-semibold uppercase tracking-wider text-sm mb-5">
                Hours
              </h4>
              <ul className="space-y-3 text-sm text-cafe-white/60">
                <li className="flex items-start gap-2">
                  <Clock size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-cafe-white/80">Mon - Fri</p>
                    <p>11:30 AM - 10:00 PM</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Clock size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-cafe-white/80">Sat - Sun</p>
                    <p>12:30 PM - 10:00 PM</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Location */}
            <div>
              <h4 className="text-primary font-semibold uppercase tracking-wider text-sm mb-5">
                Location
              </h4>
              <div className="flex items-start gap-2 text-sm text-cafe-white/60 mb-4">
                <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p>17 Queen Street N</p>
                  <p>Mississauga, Ontario</p>
                  <p>L5N 6A1</p>
                </div>
              </div>
              <a
                href="tel:+16473555671"
                className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline"
              >
                <Phone size={14} />
                (647) 355-5671
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-6 border-t border-cafe-white/5">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <p className="text-center text-cafe-white/40 text-xs">
            © {new Date().getFullYear()} Noor's Bhai Biryani. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
