import React, { useEffect, useState } from "react";

interface ParticlesProps {
  count?: number;
}

export function Particles({ count = 300 }: ParticlesProps) {
  const [particles, setParticles] = useState<React.ReactElement[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4250);
    return () => clearTimeout(timer);
  }, []);

  useEffect(
    () => {
      if (!isVisible) return;

      const generatedParticles = Array.from({ length: count }, (_, i) =>
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 2 + 3}s`,
            opacity: Math.random() * 0.2 + 0.1
          }}
        />
      );
      setParticles(generatedParticles);
    },
    [count, isVisible]
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles}
    </div>
  );
}
