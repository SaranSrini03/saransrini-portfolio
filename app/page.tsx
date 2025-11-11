import HeroSection from "@/components/HeroSection/HeroSection";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 -z-0">
          <div className="absolute inset-0 bg-black">
            <div 
              className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]"
              style={{
                backgroundSize: '20px 20px',
              }}
            />
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          <HeroSection />
        </div>
      </div>
    </>
  );
}
