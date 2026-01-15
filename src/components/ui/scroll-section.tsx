
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  triggerAnimation?: "fadeUp" | "slideLeft" | "scaleIn" | "parallax";
  backgroundImage?: string;
  overlayGradient?: string;
}

export const ScrollSection = ({ 
  children, 
  className = "", 
  triggerAnimation = "fadeUp",
  backgroundImage,
  overlayGradient = "from-cafe-black/60 via-cafe-black/40 to-cafe-black/20"
}: ScrollSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const section = sectionRef.current;
    const content = contentRef.current;

    // Create timeline for section animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        markers: false
      }
    });

    // Apply different animations based on type
    switch (triggerAnimation) {
      case "fadeUp":
        tl.fromTo(content, 
          { opacity: 0, y: 60, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
        );
        break;
      case "slideLeft":
        tl.fromTo(content,
          { opacity: 0, x: 100, rotationY: 15 },
          { opacity: 1, x: 0, rotationY: 0, duration: 1, ease: "power2.out" }
        );
        break;
      case "scaleIn":
        tl.fromTo(content,
          { opacity: 0, scale: 0.8, rotation: -5 },
          { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" }
        );
        break;
      case "parallax":
        // Background parallax effect
        if (backgroundImage) {
          gsap.to(section, {
            backgroundPosition: "center 100px",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        }
        tl.fromTo(content,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
        );
        break;
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [triggerAnimation, backgroundImage]);

  return (
    <div 
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
      style={backgroundImage ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      } : {}}
    >
      {backgroundImage && (
        <div className={`absolute inset-0 bg-gradient-to-br ${overlayGradient}`} />
      )}
      <div ref={contentRef} className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ScrollSection;
