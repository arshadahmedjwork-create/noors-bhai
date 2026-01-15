import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import UserMenu from "@/components/auth/UserMenu";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMenuOpen) setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "py-2 bg-cafe-black/95 backdrop-blur-lg border-b border-primary/10 shadow-lg"
        : "py-4 bg-transparent"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group flex-shrink-0">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/assets/noors-logo.png"
                alt="Noor's Bhai Biryani"
                className={`transition-all duration-300 object-contain ${isScrolled ? "h-10 md:h-12" : "h-12 md:h-14"
                  }`}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`relative text-sm font-medium tracking-wide uppercase transition-colors duration-300 hover-underline ${isActive(item.to)
                  ? "text-primary"
                  : "text-cafe-white/80 hover:text-cafe-white"
                  }`}
              >
                {item.label}
              </Link>
            ))}

            {/* CTA Button */}
            <Link to="/reserve">
              <motion.div
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="bg-primary text-cafe-black hover:bg-primary/90 font-semibold px-6 py-2 rounded-full transition-all duration-300">
                  Reserve Buffet
                </Button>
              </motion.div>
            </Link>

            {/* Admin Button - Only visible for admins */}
            {isAdmin && (
              <Link to="/admin">
                <motion.div
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="border-amber-500/50 text-amber-500 hover:bg-amber-500/10 font-semibold px-4 py-2 rounded-full transition-all duration-300"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                </motion.div>
              </Link>
            )}

            {/* Auth Section - Only show for logged in users */}
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-primary/20 animate-pulse" />
            ) : user ? (
              <UserMenu />
            ) : null}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden text-cafe-white p-2 rounded-lg hover:bg-cafe-white/5 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu();
            }}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden mt-4 bg-cafe-black/98 backdrop-blur-xl rounded-2xl p-6 border border-primary/20 shadow-2xl"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="flex flex-col gap-2">
                {navLinks.map((item, index) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.to}
                      className={`block py-3 px-4 rounded-lg font-medium text-center uppercase tracking-wide transition-all duration-300 ${isActive(item.to)
                        ? "bg-primary/10 text-primary"
                        : "text-cafe-white hover:bg-cafe-white/5"
                        }`}
                      onClick={toggleMenu}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="pt-4 border-t border-primary/20 mt-2"
                >
                  <Link to="/reserve" onClick={toggleMenu}>
                    <Button className="w-full bg-primary text-cafe-black hover:bg-primary/90 font-bold py-4 rounded-full">
                      Reserve Buffet
                    </Button>
                  </Link>
                </motion.div>

                {/* Mobile Admin Button - Only visible for admins */}
                {isAdmin && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.22 }}
                    className="pt-2"
                  >
                    <Link to="/admin" onClick={toggleMenu}>
                      <Button
                        variant="outline"
                        className="w-full border-amber-500/50 text-amber-500 hover:bg-amber-500/10 font-semibold py-4 rounded-full"
                      >
                        <Shield className="w-5 h-5 mr-2" />
                        Admin Portal
                      </Button>
                    </Link>
                  </motion.div>
                )}

                {/* Mobile Auth - Only show for logged in users */}
                {user && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    className="pt-4"
                  >
                    <div className="text-center text-cafe-white/70 text-sm">
                      Signed in as {user.email}
                    </div>
                  </motion.div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
