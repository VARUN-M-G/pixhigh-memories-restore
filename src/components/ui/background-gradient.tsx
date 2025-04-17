import React from "react";
interface BackgroundGradientProps {
  children: React.ReactNode;
  className?: string;
}
const BackgroundGradient = ({
  children,
  className = ""
}: BackgroundGradientProps) => {
  return <div className="">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-60" style={{
      maskImage: "radial-gradient(circle at center, transparent, black)",
      WebkitMaskImage: "radial-gradient(circle at center, transparent 0%, black 100%)"
    }} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow" />
      <div className="absolute bottom-1/2 right-1/3 w-[400px] h-[400px] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow" />
      <div className="relative">{children}</div>
    </div>;
};
export { BackgroundGradient };