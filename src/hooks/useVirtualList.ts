import { useState, useMemo } from 'react';

interface UseVirtualListProps {
  items: string[];
  itemHeight: number;
  windowHeight: number;
  searchQuery: string;
}

interface UseVirtualListReturn {
  filteredItems: string[];
  visibleItems: string[];
  totalHeight: number;
  startIndex: number;
  scrollTop: number;
  setScrollTop: (value: number) => void;
}

export const useVirtualList = ({
  items,
  itemHeight,
  windowHeight,
  searchQuery,
}: UseVirtualListProps): UseVirtualListReturn => {
  // Scroll pozisyonunu takip et
  const [scrollTop, setScrollTop] = useState(0);

  // Arama sonuçlarını memoize et
  // Bu sayede her render'da filtreleme işlemi yapmayız
  // Sadece items veya searchQuery değiştiğinde yeniden hesaplanır
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(item => item.toLowerCase().includes(query));
  }, [items, searchQuery]);

  // Görünür öğeleri hesapla
  // Bu hesaplamalar her scroll veya filteredItems değişiminde yapılır
  const totalHeight = filteredItems.length * itemHeight;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const visibleItemCount = Math.ceil(windowHeight / itemHeight);
  const endIndex = Math.min(startIndex + visibleItemCount + 1, filteredItems.length);

  // Sadece viewport'ta görünecek öğeleri al
  // Bu optimizasyon sayesinde tüm liste yerine sadece görünür kısmı render ederiz
  const visibleItems = filteredItems.slice(startIndex, endIndex);

  return {
    filteredItems,
    visibleItems,
    totalHeight,
    startIndex,
    scrollTop,
    setScrollTop,
  };
}; 