import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWork";
import SearchAlerts from "../components/SearchAlerts";


export default function Home() {
  return (
    <main className="bg-white text-black">
      <HeroSection />
      <SearchAlerts/>
      <Features />
      <HowItWorks/>
      
    </main>
  );
}
