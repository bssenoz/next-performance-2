import { memo } from 'react';
import MemoizedSearch from './MemoizedSearch'
import VirtualList from './VirtualList'

const MemoizedVirtualList = memo(VirtualList);
const MemoizedSearchComponent = memo(MemoizedSearch);

// İYİ PATTERN: Büyük veri setini component dışında oluşturarak
// her render'da yeniden oluşturulmasını önlüyoruz
const generateItems = (count: number) => 
    Array.from({ length: count }, (_, i) => `Item ${i + 1}`);
  
  // İYİ PATTERN: Statik arama verilerini component dışında tanımlayarak
  // her render'da yeniden oluşturulmasını önlüyoruz
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
  
const Search = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* İYİ PATTERN: Virtualization ile 10000 elemanlı listeyi 
            performanslı bir şekilde render ediyoruz */}
        <MemoizedVirtualList 
          items={generateItems(10000)} 
          itemHeight={40} 
          windowHeight={400} 
        />
        <div>
          {/* İYİ PATTERN: Memoized search komponenti ile 
              gereksiz render'ları önlüyoruz */}
          <MemoizedSearchComponent 
            items={searchItems} 
                onSearch={(query) => console.log('Searching for:', query)} 
            />
            </div>
        </div>
    )
}

export default Search


