import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Spotlight from '@/pages/Spotlight';
import Government from '@/pages/Government';
import Kaladkain from '@/pages/Kaladkain';
import Editorial from '@/pages/Editorial';
import Sports from '@/pages/Sports';
import PressRelease from '@/pages/PressRelease';
import ArticleDetail from '@/pages/ArticleDetail';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

export const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<Home />} />

      <Route path="spotlight" element={<Spotlight />} />
      <Route path="spotlight/:category" element={<Spotlight />} />

      <Route path="government" element={<Government />} />
      <Route path="government/:category" element={<Government />} />

      <Route path="kaladkain" element={<Kaladkain />} />
      <Route path="kaladkain/:category" element={<Kaladkain />} />

      <Route path="editorial" element={<Editorial />} />
      <Route path="editorial/:category" element={<Editorial />} />

      <Route path="sports" element={<Sports />} />
      <Route path="press-release" element={<PressRelease />} />

      <Route path="article/:slug" element={<ArticleDetail />} />

      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);
