
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AboutSection = () => (
  <section className="py-20 bg-cafe-white">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-cafe-black mb-6">
            The Taste of <span className="text-cafe-gold">Authentic Briyani</span>
          </h2>
          <p className="text-cafe-black/80 mb-4">
            Noor Bhai's brings the authentic flavors of Briyani to Mississauga. Our chef, Chef Noor Mohammed, with decades of experience, prepares every dish with traditional techniques and the freshest ingredients.
          </p>
          <p className="text-cafe-black/80 mb-6">
            From fragrant rice to perfectly spiced meat, every Briyani tells a story of culinary heritage. We take pride in offering a genuine Briyani dining experience in a warm, welcoming atmosphere.
          </p>
          <Link to="/about">
            <Button className="bg-cafe-gold text-cafe-black hover:bg-cafe-gold/90 shadow-md hover:scale-105 transition-transform">
              Our Story
            </Button>
          </Link>
        </div>
        <div className="md:w-1/2">
          <div className="relative rounded-xl overflow-hidden shadow-2xl border border-cafe-gold/30 bg-white/20 backdrop-blur-sm">
            <div className="absolute -left-4 -top-4 w-full h-full border-2 border-cafe-gold rounded-lg pointer-events-none"></div>
            <img
              src="https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2071&auto=format&fit=crop"
              alt="Z-Cafe dining experience"
              className="rounded-lg w-full h-auto object-cover shadow-lg border-2 border-cafe-gold/70"
              style={{ filter: "brightness(0.97) saturate(1.1)" }}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
