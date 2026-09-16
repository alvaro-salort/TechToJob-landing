import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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
    <div className="min-h-[100dvh] flex flex-col bg-[#030507] selection:bg-brand-teal selection:text-brand-dark">
      <Navbar />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <HowItWorksSection />
        <TalentSection />
        <CompaniesSection />
        <TournamentsSection />
        <NetworkingSection />
        <TestimonialsSection />
        <NewsSection />
        <NewsletterSection />
        <ClosingSection />
      </main>
      <Footer />
    </div>
  );
}
