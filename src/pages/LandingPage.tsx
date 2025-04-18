import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import { Navbar } from "@/components/navbar";
import { ArrowRight, CheckCircle2, Upload } from "lucide-react";

export default function LandingPage() {
  return (
    <MainLayout>
      <Navbar />
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Transform Your Photos with AI
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Enhance old photos, upscale low resolution images, and restore damaged pictures with our powerful AI technology
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto justify-center">
            <Button 
              size="xl" 
              asChild 
              variant="cta"
              className="shadow-xl rounded-xl"
            >
              <Link to="/signup">
                <span className="text-lg">Try Free</span>
                <ArrowRight className="h-5 w-5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="mt-20 w-full">
          <h2 className="text-3xl font-bold mb-10">See the Magic</h2>
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-center max-w-5xl mx-auto">
            <div className="relative w-full md:w-1/2 max-w-md">
              <div className="overflow-hidden rounded-lg shadow-lg">
                <img 
                  src="/lovable-uploads/4d29d7d4-819f-40ea-a4f8-b056f5420e49.png" 
                  alt="Before Restoration" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute top-4 left-4 bg-black/70 text-white py-2 px-4 text-sm font-medium rounded-md">
                Before
              </div>
            </div>
            
            <div className="relative w-full md:w-1/2 max-w-md">
              <div className="overflow-hidden rounded-lg shadow-lg">
                <img 
                  src="/lovable-uploads/651fabb7-571a-4fec-9c31-0e2544550a88.png" 
                  alt="After Restoration" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute top-4 left-4 bg-blue-600 text-white py-2 px-4 text-sm font-medium rounded-md">
                After
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-24 w-full">
          <h2 className="text-3xl font-bold mb-3">How It Works</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">Transform your photos in just a few simple steps</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass-card p-8 rounded-xl animate-fade-in shadow-md hover:shadow-lg transition-all" style={{animationDelay: '0.2s'}}>
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Upload Your Photo</h3>
              <p className="text-muted-foreground">
                Upload any photo that needs enhancement, restoration, or upscaling
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-xl animate-fade-in shadow-md hover:shadow-lg transition-all" style={{animationDelay: '0.4s'}}>
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">AI Processing</h3>
              <p className="text-muted-foreground">
                Our advanced AI analyzes and enhances your image in seconds
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-xl animate-fade-in shadow-md hover:shadow-lg transition-all" style={{animationDelay: '0.6s'}}>
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Download Result</h3>
              <p className="text-muted-foreground">
                Download your enhanced photo in full resolution and share it
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-24 w-full max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-3">Powerful Features</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">Everything you need to transform your photos</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start p-4">
              <div className="bg-blue-100 rounded-full p-2 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold mb-1">High Resolution Output</h3>
                <p className="text-muted-foreground">Get crystal clear results with up to 4x upscaling</p>
              </div>
            </div>
            
            <div className="flex items-start p-4">
              <div className="bg-purple-100 rounded-full p-2 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold mb-1">Noise Reduction</h3>
                <p className="text-muted-foreground">Remove unwanted noise and grain from old photos</p>
              </div>
            </div>
            
            <div className="flex items-start p-4">
              <div className="bg-green-100 rounded-full p-2 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold mb-1">Face Enhancement</h3>
                <p className="text-muted-foreground">Restore details in faces for perfect portrait photos</p>
              </div>
            </div>
            
            <div className="flex items-start p-4">
              <div className="bg-yellow-100 rounded-full p-2 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold mb-1">Color Correction</h3>
                <p className="text-muted-foreground">Restore vibrant colors in faded and discolored photos</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 w-full text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Photos?</h2>
          <Button 
            size="xl" 
            asChild 
            variant="cta"
            className="shadow-xl rounded-xl px-10"
          >
            <Link to="/signup">
              <span className="text-lg">Get Started Now</span>
              <ArrowRight className="h-5 w-5 ml-1" />
            </Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
}
