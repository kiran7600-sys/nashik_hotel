import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import MenuHighlights from "@/components/MenuHighlights";
import ReserveForm from "@/components/ReserveForm";
import VisitUs from "@/components/VisitUs";
import ScrollVine from "@/components/ScrollVine";

export default function Home() {
  return (
    <>
      {/* Scroll vine decorative element — visible across the horizontal section */}
      <ScrollVine />

      {/* Horizontal scroll panels: Hero → EcoStory → AmbienceGallery → TrustStrip
          On mobile (< 768px) these render as normal vertical sections */}
      <HorizontalScrollSection />

      {/* Normal vertical scroll continues below */}
      <MenuHighlights />
      <ReserveForm />
      <VisitUs />
    </>
  );
}
