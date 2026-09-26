import { HeroSection } from "@/components/ui/demo";
import { Preloader } from "@/components/ui/preloader";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Navbar } from "@/components/ui/navbar";
import { Marquee } from "@/components/ui/marquee";
import { SkillsSection } from "@/components/ui/skills";
import { ProjectsSection } from "@/components/ui/projects";
import { TimelineSection } from "@/components/ui/timeline";
import { Interactive3DSection } from "@/components/ui/interactive3d";
import { ContactSection } from "@/components/ui/contact";
import { BackToTop } from "@/components/ui/back-to-top";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#05060a] text-white">
      {/* film grain overlay */}
      <div className="grain-overlay pointer-events-none fixed inset-0 z-[110] opacity-[0.05]" />

      <Preloader />
      <CustomCursor />
      <Navbar />

      <HeroSection />

      <Marquee />

      <SkillsSection />

      <ProjectsSection />

      <TimelineSection />

      <Interactive3DSection />

      <ContactSection />

      <BackToTop />
    </main>
  );
}