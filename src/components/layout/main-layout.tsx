
import { BackgroundGradient } from "@/components/ui/background-gradient";

interface MainLayoutProps {
  children: React.ReactNode;
  withBackground?: boolean;
}

export function MainLayout({ children, withBackground = true }: MainLayoutProps) {
  if (withBackground) {
    return (
      <BackgroundGradient className="min-h-screen">
        {children}
      </BackgroundGradient>
    );
  }
  
  return <div className="min-h-screen bg-background">{children}</div>;
}
