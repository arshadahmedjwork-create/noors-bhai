
import PageLayout from "@/components/layout/PageLayout";
import MenuHeaderSection from "./menu-sections/MenuHeaderSection";
import MenuCategoriesSection from "./menu-sections/MenuCategoriesSection";
import OrderOnlineCTASection from "./menu-sections/OrderOnlineCTASection";
import USPHighlightsSection from "./menu-sections/USPHighlightsSection";

const Menu = () => {
  return (
    <PageLayout>
      <MenuHeaderSection />
      <USPHighlightsSection />
      <MenuCategoriesSection />
      <OrderOnlineCTASection />
    </PageLayout>
  );
};

export default Menu;
