import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollEffects } from "@/components/layout/ScrollEffects";
import { SectionTransition } from "@/components/ui/SectionTransition";
import { HeroSection } from "@/components/hero/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { TalentSection } from "@/components/sections/TalentSection";
import { CompaniesSection } from "@/components/sections/CompaniesSection";
import { TournamentsSection } from "@/components/sections/TournamentsSection";
import { NetworkingSection } from "@/components/sections/NetworkingSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { ClosingSection } from "@/components/sections/ClosingSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#030507] selection:bg-brand-teal selection:text-brand-dark" suppressHydrationWarning>
      <Navbar />
      <ScrollEffects />

      <main id="main-content" className="flex-1 w-full" suppressHydrationWarning>
        <div id="hero" suppressHydrationWarning>
          <HeroSection />
        </div>

        {/* Transition: Dark Hero (#030507) -> Light How It Works (#fbfbfd) */}
        <SectionTransition direction="dark-to-light" fromColor="#030507" toColor="#fbfbfd" />

        <HowItWorksSection />
        <TalentSection />

        {/* Transition: Light Talent (#ffffff) -> Dark Companies (#161819) */}
        <SectionTransition direction="light-to-dark" fromColor="#ffffff" toColor="#161819" />

        <CompaniesSection />

        {/* Transition: Dark Companies (#161819) -> Light Tournaments (#ffffff) */}
        <SectionTransition direction="dark-to-light" fromColor="#161819" toColor="#ffffff" />

        <TournamentsSection />
        <NetworkingSection />
        <TestimonialsSection />
        <NewsSection />
        <NewsletterSection />

        {/* Transition: Light Newsletter (#ffffff) -> Dark Closing (#030507) */}
        <SectionTransition direction="light-to-dark" fromColor="#ffffff" toColor="#030507" />

        <ClosingSection />
      </main>
      <Footer />
    </div>
  );
}

