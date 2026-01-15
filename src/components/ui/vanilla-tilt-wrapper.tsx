
import React, { useRef, useEffect } from 'react';
import VanillaTilt from 'vanilla-tilt';

interface VanillaTiltWrapperProps {
  children: React.ReactNode;
  className?: string;
  options?: any;
}

/**
 * Provides a 3D Vanilla Tilt effect to children
 */
export const VanillaTiltWrapper: React.FC<VanillaTiltWrapperProps> = ({
  children,
  className,
  options = {},
}) => {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tiltRef.current && typeof window !== "undefined") {
      VanillaTilt.init(tiltRef.current, {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.18,
        scale: 1.04,
        ...options,
      });
    }
    
    return () => {
      if (tiltRef.current) {
        // Access the vanillaTilt property using type assertion
        const element = tiltRef.current as any;
        if (element.vanillaTilt) {
          element.vanillaTilt.destroy();
        }
      }
    };
  }, [options]);

  return (
    <div ref={tiltRef} className={className || ""}>
      {children}
    </div>
  );
};

export default VanillaTiltWrapper;
