
import React, { useRef, useEffect, ReactNode } from "react";
import VanillaTilt from "vanilla-tilt";

interface TiltEffectProps {
  children: ReactNode;
  className?: string;
  options?: any;
}

export const TiltEffect = ({
  children,
  className = "",
  options = {},
}: TiltEffectProps) => {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tiltNode = tiltRef.current;
    if (tiltNode) {
      const defaultOptions = {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
        scale: 1.05,
      };
      
      VanillaTilt.init(tiltNode, {
        ...defaultOptions,
        ...options,
      });
    }
    
    return () => {
      if (tiltNode) {
        // Access the vanillaTilt property using type assertion
        const element = tiltNode as any;
        if (element.vanillaTilt) {
          element.vanillaTilt.destroy();
        }
      }
    };
  }, [options]);

  return (
    <div ref={tiltRef} className={className}>
      {children}
    </div>
  );
};

export default TiltEffect;
