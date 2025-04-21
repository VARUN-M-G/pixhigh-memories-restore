
import React from "react";

interface BackgroundGradientProps {
  children: React.ReactNode;
  className?: string;
}

const BackgroundGradient = ({
  children,
  className = ""
}: BackgroundGradientProps) => {
  return (
    <div className={className}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-90" />
      <div className="absolute top-0 right-0 w-[750px] h-[750px] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-[650px] h-[650px] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-[550px] h-[550px] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" />
      <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" />
      <div className="relative">{children}</div>
    </div>
  );
};

export { BackgroundGradient };
