import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { FloatingSocial } from '@/components/common/FloatingSocial';
import { useAnalytics } from '@/hooks/useAnalytics';

export const Layout = () => {
  useAnalytics();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main id="main" className="min-h-screen pt-[120px]">
        <Outlet />
      </main>
      <Footer />
      <FloatingSocial />
    </>
  );
};
