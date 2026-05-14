import { useContext } from 'react';
import { ArticlesContext, type ArticlesContextValue } from '@/context/ArticlesContext';

export const useArticles = (): ArticlesContextValue => {
  const ctx = useContext(ArticlesContext);
  if (!ctx) {
    throw new Error('useArticles must be used within an ArticlesProvider');
  }
  return ctx;
};
