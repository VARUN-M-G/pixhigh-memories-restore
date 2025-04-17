
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import { Navbar } from "@/components/navbar";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <MainLayout>
      <Navbar />
      <section className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Restore and Reimagine Your Memories
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
          Enhance and breathe new life into your old photos with our AI-powered
          photo restoration technology.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
          <Button size="lg" asChild className="glass-card flex-1 font-semibold gap-2">
            <Link to="/signup">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="mt-16 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">See the Difference</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center p-6 bg-gray-100/20 backdrop-blur-sm rounded-xl">
            <div className="flex flex-col items-center">
              <div className="relative overflow-hidden rounded-lg shadow-lg mb-3">
                <img 
                  src="/lovable-uploads/4d29d7d4-819f-40ea-a4f8-b056f5420e49.png" 
                  alt="Before Restoration" 
                  className="w-60 h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white py-1 px-2 text-sm">
                  Before
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <ArrowRight className="h-8 w-8 text-primary" />
            </div>
            
            <div className="flex flex-col items-center">
              <div className="relative overflow-hidden rounded-lg shadow-lg mb-3">
                <img 
                  src="/lovable-uploads/57fcc5bd-960e-4c7a-8db7-cbc849a85311.png" 
                  alt="After Restoration" 
                  className="w-60 h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white py-1 px-2 text-sm">
                  After
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-6 rounded-xl animate-fade-in" style={{animationDelay: '0.2s'}}>
            <h3 className="text-xl font-semibold mb-3">Upload Photos</h3>
            <p className="text-muted-foreground">
              Easily upload your old or damaged photos for restoration
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-xl animate-fade-in" style={{animationDelay: '0.4s'}}>
            <h3 className="text-xl font-semibold mb-3">AI Restoration</h3>
            <p className="text-muted-foreground">
              Advanced AI enhances details, colors, and removes damage
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-xl animate-fade-in" style={{animationDelay: '0.6s'}}>
            <h3 className="text-xl font-semibold mb-3">Download & Share</h3>
            <p className="text-muted-foreground">
              Easily download and share your restored memories
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
