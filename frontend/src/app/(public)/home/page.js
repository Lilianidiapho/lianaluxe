import Navbar from "@/components/navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturedSection from "@/components/home/FeaturedSection";
import StorySection from "@/components/home/StorySection";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <main className="bg-bg-base min-h-screen text-white overflow-hidden">
      <Navbar />
      <HeroSection />
      <FeaturedSection />
      <StorySection />
      <Footer />
    </main>
  );
}