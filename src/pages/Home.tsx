import { HeroBanner } from '@/components/sections/HeroBanner';
import { BreakingStories } from '@/components/sections/BreakingStories';
import { FeaturedGrid } from '@/components/sections/FeaturedGrid';
import { SpotlightSection } from '@/components/sections/SpotlightSection';
import { GovernmentSection } from '@/components/sections/GovernmentSection';
import { KaladkainSection } from '@/components/sections/KaladkainSection';
import { EditorialSection } from '@/components/sections/EditorialSection';
import { WatchSection } from '@/components/sections/WatchSection';
import { TrendingStories } from '@/components/sections/TrendingStories';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import { LoadingShell, ErrorShell } from '@/components/common/LoadingShell';
import { useHomeFeed } from '@/hooks/useHomeFeed';
import { useArticles } from '@/hooks/useArticles';

export const Home = () => {
  const feed = useHomeFeed();
  const { refresh } = useArticles();

  if (feed.status === 'loading' && feed.all.length === 0) {
    return <LoadingShell />;
  }
  if (feed.status === 'error' && feed.all.length === 0) {
    return <ErrorShell message={feed.error ?? undefined} onRetry={() => void refresh()} />;
  }

  return (
    <>
      <HeroBanner hero={feed.hero} total={feed.all.length} />
      <BreakingStories ticker={feed.ticker} trio={feed.trio} />
      <FeaturedGrid articles={feed.featured} />
      <SpotlightSection articles={feed.spotlight} />
      <GovernmentSection articles={feed.government} />
      <KaladkainSection articles={feed.kaladkain} />
      <EditorialSection articles={feed.editorial} />
      <WatchSection />
      <TrendingStories articles={feed.trending} />
      <NewsletterSection />
    </>
  );
};

export default Home;
