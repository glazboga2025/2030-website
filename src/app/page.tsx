import { HeroSection } from "@/components/HeroSection";
import { NavBar } from "@/components/NavBar";
import { ServicesSection } from "@/components/ServicesSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
      </main>
      <Footer />
    </>
  );
}
