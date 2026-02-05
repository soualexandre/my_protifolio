import { NavHeader } from "./components/NavHeader";
import { SocialHeader } from "./components/SocialHeader";
import { ExperiencePipeline } from "./components/ExperiencePipeline";
import { DataProcessing } from "./components/DataProcessing";
import { ProjectsSection } from "./components/ProjectsSection";
import { AcademicSection } from "./components/AcademicSection";
import { FooterCTA } from "./components/FooterCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <NavHeader />
      <SocialHeader />
      <main>
        <ExperiencePipeline />
        <DataProcessing />
        <ProjectsSection />
        <AcademicSection />
        <FooterCTA />
      </main>
    </div>
  );
}
