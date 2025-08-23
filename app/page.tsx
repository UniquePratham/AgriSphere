import { HeroSection } from '@/components/home/hero-section';
import { TracksSection } from '@/components/home/tracks-section';
import { StatsSection } from '@/components/home/stats-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <TracksSection />
      <StatsSection />
    </>
  );
}