import { useState, useCallback, useMemo } from 'react';
import debounce from 'lodash/debounce';

interface SearchResult {
  id: number;
  title: string;
  description: string;
}

interface UseSearchProps {
  items: SearchResult[];
  onSearch: (query: string) => void;
  debounceTime?: number;
}

interface UseSearchReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredResults: SearchResult[];
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useSearch = ({
  items,
  onSearch,
  debounceTime = 300,
}: UseSearchProps): UseSearchReturn => {
  // Arama sorgusunu state'te tut
  const [searchQuery, setSearchQuery] = useState('');

  // Debounce ile arama fonksiyonu
  // Bu sayede her tuş vuruşunda değil, kullanıcı yazmayı bitirdiğinde arama yapılır
  // Performance açısından önemli bir optimizasyon
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, debounceTime),
    [onSearch, debounceTime]
  );

  // Input değişikliğini yönet
  // Event handler'ı useCallback ile memoize etmeye gerek yok
  // Çünkü zaten debouncedSearch memoize edilmiş durumda
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Filtrelenmiş sonuçları memoize et
  // Bu sayede her render'da filtreleme işlemi yapmayız
  // Sadece items veya searchQuery değiştiğinde yeniden hesaplanır
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return items;
    
    const query = searchQuery.toLowerCase();
    return items.filter(
      item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
  }, [items, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredResults,
    handleSearch,
  };
}; 