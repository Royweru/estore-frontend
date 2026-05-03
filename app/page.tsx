import {
  HeroSection,
  CollectionShowcase,
  TrendingNow,
  CommunitySection,
  EditorialLookbook,
  NewsletterSection,
} from "@/components/home";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen pt-16 md:pt-20">
      <HeroSection />
      <CollectionShowcase />
      <TrendingNow />
      <CommunitySection />
      <EditorialLookbook />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
