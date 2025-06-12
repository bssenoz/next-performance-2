import React, { useState, useEffect, useRef } from 'react';
import { useVirtualList } from '../../hooks/useVirtualList';

interface VirtualListProps {
  items: string[];
  itemHeight: number;
  windowHeight: number;
}

const VirtualList: React.FC<VirtualListProps> = React.memo(({ items, itemHeight, windowHeight }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const renderCount = useRef(0);

  // Render sayısını takip et
  useEffect(() => {
    renderCount.current += 1;
    console.log('VirtualList render oldu:', renderCount.current, 'kez');
  });

  // Virtual list hook'unu kullan
  const {
    filteredItems,
    visibleItems,
    totalHeight,
    startIndex,
    scrollTop,
    setScrollTop
  } = useVirtualList({
    items,
    itemHeight,
    windowHeight,
    searchQuery
  });

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setScrollTop(0); // Arama yapıldığında listeyi en üste al
  };

  return (
    <div className="p-4 border rounded-lg bg-white text-black">
      <div className="absolute -top-6 left-0 text-sm text-gray-500">
        VirtualList render: {renderCount.current}
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">VirtualList</h3>
        <p className="text-sm text-gray-600 mb-2">
          Bu komponent windowing tekniği kullanarak sadece görünür öğeleri render eder.
          React.memo ve useMemo ile optimize edilmiştir.
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Listede ara..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute right-2 top-2 text-sm text-gray-500">
            {filteredItems.length} / {items.length} öğe
          </div>
        </div>

        <div
          ref={containerRef}
          style={{
            height: windowHeight,
            overflow: 'auto',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
          onScroll={handleScroll}
        >
          <div style={{ height: totalHeight, position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: startIndex * itemHeight,
                left: 0,
                right: 0,
              }}
            >
              {visibleItems.map((item, index) => (
                <div
                  key={startIndex + index}
                  style={{
                    height: itemHeight,
                    padding: '8px',
                    borderBottom: '1px solid #eee',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default VirtualList; 