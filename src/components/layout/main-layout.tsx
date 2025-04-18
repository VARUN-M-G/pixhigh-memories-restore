
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Footer } from "@/components/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
  withBackground?: boolean;
}

export function MainLayout({ children, withBackground = true }: MainLayoutProps) {
  if (withBackground) {
    return (
      <BackgroundGradient className="min-h-screen w-full flex flex-col">
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
