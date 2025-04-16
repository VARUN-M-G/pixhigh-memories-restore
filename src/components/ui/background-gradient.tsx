
import React from "react";

interface BackgroundGradientProps {
  children: React.ReactNode;
  className?: string;
}

const BackgroundGradient = ({
  children,
  className = "",
}: BackgroundGradientProps) => {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-purple-100 opacity-50"
        style={{
          maskImage: "radial-gradient(circle at center, transparent, black)",
          WebkitMaskImage: "radial-gradient(circle at center, transparent 0%, black 100%)",
        }}
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" />
      <div className="relative">{children}</div>
    </div>
  );
};

export { BackgroundGradient };
