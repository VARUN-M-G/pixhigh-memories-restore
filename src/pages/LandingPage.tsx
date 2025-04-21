
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import { Navbar } from "@/components/navbar";

export default function LandingPage() {
  return (
    <MainLayout>
      {/* Modern calm gradient background */}
      <div className="absolute inset-0 -z-10" style={{
        background: "linear-gradient(109.6deg, rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1%)"
      }} />
      <div className="relative min-h-screen">
        <Navbar />
        <section className="container mx-auto px-4 py-12 md:py-20 flex flex-col items-center text-center animate-fade-in relative z-10">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 drop-shadow-sm">
            Welcome to Pixhigh
          </h1>
          <p className="max-w-2xl text-lg text-gray-700 mb-10">
            The smartest way to upscale, enhance, and restore your images using AI.<br />
            Start today for free!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="cta-button rounded-2xl shadow-lg">
              <Link to="/signup">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-2xl shadow border-gray-300 bg-white/70 hover:bg-white">
              <Link to="/login">Login instead</Link>
            </Button>
          </div>
          {/* BEFORE & AFTER DEMO */}
          <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 justify-center items-center my-12">
            <div className="w-full md:w-1/2 flex flex-col items-center glass-card rounded-2xl p-6 shadow-xl">
              <span className="text-gray-700 mb-4 font-semibold">Before</span>
              <img
                className="rounded-xl w-full aspect-square object-cover border border-gray-200 shadow-inner"
                src="/placeholder.svg"
                alt="Before enhancement"
                style={{background: "#ececec"}} 
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-center glass-card rounded-2xl p-6 shadow-xl">
              <span className="text-gray-700 mb-4 font-semibold">After</span>
              <img
                className="rounded-xl w-full aspect-square object-cover border border-indigo-200 shadow-lg"
                src="/placeholder.svg"
                alt="After enhancement"
                style={{background: "#e7f0fd"}}
              />
            </div>
          </div>
          {/* BASIC INFO BLOCK */}
          <div className="mt-10 w-full max-w-xl mx-auto glass-card rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Enhance your images in one click</h2>
            <ul className="mt-4 text-gray-700 grid gap-2 text-left text-base list-disc list-inside">
              <li>Upscale images by up to 4x with no visible artifacts</li>
              <li>Remove noise, restore colors and details with advanced AI</li>
              <li>Super easy drag &amp; drop workflow—no signup needed to try</li>
              <li>Totally secure, private and fast: your images are never shared</li>
            </ul>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
