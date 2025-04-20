
import React, { useEffect, useRef } from "react";
import anime from "animejs";

interface BackgroundGradientProps {
  children: React.ReactNode;
  className?: string;
}

const BackgroundGradient = ({
  children,
  className = ""
}: BackgroundGradientProps) => {
  const cornerTopLeftRef = useRef<HTMLDivElement>(null);
  const cornerTopRightRef = useRef<HTMLDivElement>(null);
  const cornerBottomLeftRef = useRef<HTMLDivElement>(null);
  const cornerBottomRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = anime.timeline({
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine'
    });

    timeline
      .add({
        targets: [
          cornerTopLeftRef.current,
          cornerTopRightRef.current,
          cornerBottomLeftRef.current,
          cornerBottomRightRef.current
        ],
        opacity: [0.1, 0.3],
        scale: [1, 1.2],
        duration: 3000,
        delay: anime.stagger(200)
      });
  }, []);

  return (
    <div className={className}>
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background opacity-95" />
      
      {/* Animated corners */}
      <div 
        ref={cornerTopLeftRef}
        className="absolute top-0 left-0 w-32 h-32 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
      />
      <div 
        ref={cornerTopRightRef}
        className="absolute top-0 right-0 w-32 h-32 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
      />
      <div 
        ref={cornerBottomLeftRef}
        className="absolute bottom-0 left-0 w-32 h-32 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
      />
      <div 
        ref={cornerBottomRightRef}
        className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-300 dark:bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
      />

      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
};

export { BackgroundGradient };
