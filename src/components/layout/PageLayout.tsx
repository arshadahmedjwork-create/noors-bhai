
import React from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import FloatingQuickAccess from "@/components/ui/floating-quick-access";
import CustomCursor from "@/components/ui/custom-cursor";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-cafe-black w-full overflow-x-hidden relative">
      <CustomCursor />
      <Header />
      <motion.main 
        className="flex-grow w-full pt-16 md:pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full max-w-full min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] container-fluid">
          {children}
        </div>
      </motion.main>
      <Footer />
      <FloatingQuickAccess />
    </div>
  );
};

export default PageLayout;
