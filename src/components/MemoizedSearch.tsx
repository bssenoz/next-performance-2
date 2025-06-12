import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import debounce from 'lodash/debounce';

interface SearchResult {
  id: number;
  title: string;
  description: string;
}

interface MemoizedSearchProps {
  items: SearchResult[];
  onSearch: (query: string) => void;
}

const MemoizedSearch: React.FC<MemoizedSearchProps> = React.memo(({ items, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    console.log('MemoizedSearch render oldu:', renderCount.current, 'kez');
  });

  // Debounce ile arama fonksiyonu - her tuş vuruşunda değil, yazma durduğunda arama yap
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, 300), // 300ms bekle - performans optimizasyonu
    [onSearch]
  );

  // Input değişikliğini yönet
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query); // Debounce'lu arama fonksiyonunu çağır
  };

  // Filtrelenmiş sonuçları memoize et - aynı arama terimi için tekrar hesaplama yapma
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return items;
    
    const query = searchQuery.toLowerCase();
    return items.filter(
      item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
  }, [items, searchQuery]); // Sadece items veya searchQuery değiştiğinde yeniden hesapla

  return (
    <div className="p-4 border rounded-lg bg-white text-black">
      <div className="absolute -top-6 left-0 text-sm text-gray-500">
        MemoizedSearch render: {renderCount.current}
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">MemoizedSearch</h3>
        <p className="text-sm text-gray-600 mb-2">
          Bu komponent debounce ve memoization teknikleri kullanarak optimize edilmiştir.
          React.memo ile sarıldığı için sadece gerekli durumlarda render olur.
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Ara..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="max-h-[400px] overflow-auto">
          {filteredResults.map(item => (
            <div
              key={item.id}
              className="p-3 mb-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default MemoizedSearch; 