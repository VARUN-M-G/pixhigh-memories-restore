import { Footer } from "@/components/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col w-full">
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
}