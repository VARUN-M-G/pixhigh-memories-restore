
import { Footer } from "@/components/Footer";
import { BackgroundGradient } from "@/components/ui/background-gradient";

interface MainLayoutProps {
  children: React.ReactNode;
  withBackground?: boolean;
}

export function MainLayout({ children, withBackground = false }: MainLayoutProps) {
  if (withBackground) {
    return (
      <BackgroundGradient className="min-h-screen relative flex flex-col w-full">
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </BackgroundGradient>
    );
  }
  
  return (
    <div className="min-h-screen bg-background flex flex-col w-full">
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
}
