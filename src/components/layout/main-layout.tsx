
import { BackgroundGradient } from "@/components/ui/background-gradient";

interface MainLayoutProps {
  children: React.ReactNode;
  withBackground?: boolean;
}

export function MainLayout({ children, withBackground = true }: MainLayoutProps) {
  if (withBackground) {
    return (
      <BackgroundGradient className="min-h-screen w-full">
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
      </BackgroundGradient>
    );
  }
  
  return (
    <div className="min-h-screen bg-background flex flex-col w-full">
      {children}
    </div>
  );
}
