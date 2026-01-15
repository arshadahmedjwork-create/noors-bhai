
import PageLayout from "@/components/layout/PageLayout";
import AboutHeroSection from "./about-sections/AboutHeroSection";
import AboutStorySection from "./about-sections/AboutStorySection";
import AboutChefSection from "./about-sections/AboutChefSection";
import AboutFoodShowcaseSection from "./about-sections/AboutFoodShowcaseSection";
import AboutValuesSection from "./about-sections/AboutValuesSection";
import AboutCTASection from "./about-sections/AboutCTASection";

const About = () => {
  return (
    <PageLayout>
      <AboutHeroSection />
      <AboutStorySection />
      <AboutChefSection />
      <AboutFoodShowcaseSection />
      <AboutValuesSection />
      <AboutCTASection />
    </PageLayout>
  );
};

export default About;
