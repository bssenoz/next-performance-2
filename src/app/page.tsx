'use client'

import React, { memo } from 'react';
import { BadCounter } from '../components/BadCounter'
import { GoodCounter } from '../components/GoodCounter'
import VirtualList from '../components/VirtualList'
import MemoizedSearch from '../components/MemoizedSearch'

// Komponentleri memoize et
const MemoizedVirtualList = memo(VirtualList);
const MemoizedSearchComponent = memo(MemoizedSearch);
const MemoizedBadCounter = memo(BadCounter);
const MemoizedGoodCounter = memo(GoodCounter);

// Sample data for demonstration
const generateItems = (count: number) => 
  Array.from({ length: count }, (_, i) => `Item ${i + 1}`);

const searchItems = [
  { id: 1, title: "React Performance", description: "Tips for optimizing React applications" },
  { id: 2, title: "Virtualization", description: "Efficiently render large lists using windowing" },
  { id: 3, title: "Memoization", description: "Optimize performance with useMemo and useCallback" },
  { id: 4, title: "Debouncing", description: "Prevent excessive function calls with debounce" },
  { id: 5, title: "TypeScript", description: "Type-safe JavaScript development" },
  { id: 6, title: "React Hooks", description: "Modern React state and lifecycle management" },
  { id: 7, title: "Component Design", description: "Best practices for React component architecture" },
  { id: 8, title: "State Management", description: "Managing application state effectively" },
  { id: 9, title: "Code Splitting", description: "Optimize bundle size with dynamic imports" },
  { id: 10, title: "Testing", description: "Writing effective tests for React applications" },
];

const Home = memo(() => {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <MemoizedBadCounter />
          <MemoizedGoodCounter />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <MemoizedVirtualList 
            items={generateItems(10000)} 
            itemHeight={40} 
            windowHeight={400} 
          />
          <div>
            <MemoizedSearchComponent 
              items={searchItems} 
              onSearch={(query) => console.log('Searching for:', query)} 
            />

          </div>
        </div>
      </div>
    </main>
  );
});

export default Home;
