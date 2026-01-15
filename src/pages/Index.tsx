import PageLayout from "@/components/layout/PageLayout";
import HeroSection from "./index-sections/HeroSection";
import AboutSection from "./index-sections/AboutSection";
import MenuHighlightsSection from "./index-sections/MenuHighlightsSection";
import TestimonialsSection from "./index-sections/TestimonialsSection";
import CTASection from "./index-sections/CTASection";

const HomePage = () => {
  return (
    <PageLayout>
      <HeroSection />
      <AboutSection />
      <MenuHighlightsSection />
      <TestimonialsSection />
      <CTASection />
    </PageLayout>
  );
};

export default HomePage;
