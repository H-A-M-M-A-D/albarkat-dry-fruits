import { Hero } from "@/components/home/Hero";
import { CategorySection } from "@/components/home/CategorySection";
import { BestSellers } from "@/components/home/BestSellers";
import { ShopByPurpose } from "@/components/home/ShopByPurpose";
import { DatesSpotlight } from "@/components/home/DatesSpotlight";
import { EditorialStory } from "@/components/home/EditorialStory";
import { CorporateGiftingTeaser } from "@/components/home/CorporateGiftingTeaser";
import { FaqPreview } from "@/components/home/FaqPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <BestSellers />
      <ShopByPurpose />
      <DatesSpotlight />
      <EditorialStory />
      <CorporateGiftingTeaser />
      <FaqPreview />
    </>
  );
}
