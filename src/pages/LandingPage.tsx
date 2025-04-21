
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Navbar } from "@/components/navbar";

export default function LandingPage() {
  return (
    <MainLayout>
      {/* Enhanced background for better contrast */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-100 via-white to-purple-100" />
      <div className="relative min-h-screen">
        <BackgroundGradient className="fixed inset-0 -z-20">
          <div></div>
        </BackgroundGradient>
        <Navbar />
        <section className="container mx-auto px-4 py-12 md:py-20 flex flex-col items-center text-center animate-fade-in relative z-10">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 drop-shadow-sm">
            Welcome to Pixhigh
          </h1>
          <p className="max-w-2xl text-lg text-gray-700 mb-10">
            The smartest way to upscale, enhance, and restore your images using AI.
            <br />
            Start today for free!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="cta-button rounded-2xl shadow-lg">
              <Link to="/signup">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-2xl shadow border-gray-300 bg-white/70 hover:bg-white">
              <Link to="/login">Login instead</Link>
            </Button>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
