import { HeroSection } from "@/components/landing/hero-section";
import { WorkflowDemo } from "@/components/landing/workflow-demo";
import { FeaturesSection } from "@/components/landing/features-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WorkflowDemo />
      <FeaturesSection />
    </>
  );
}
