import Hero from "@/components/Hero";
import EcoStory from "@/components/EcoStory";
import MenuHighlights from "@/components/MenuHighlights";
import AmbienceGallery from "@/components/AmbienceGallery";
import TrustStrip from "@/components/TrustStrip";
import ReserveForm from "@/components/ReserveForm";
import VisitUs from "@/components/VisitUs";
import ScrollVine from "@/components/ScrollVine";

export default function Home() {
  return (
    <>
      <ScrollVine />
      <Hero />
      <EcoStory />
      <MenuHighlights />
      <AmbienceGallery />
      <TrustStrip />
      <ReserveForm />
      <VisitUs />
    </>
  );
}
