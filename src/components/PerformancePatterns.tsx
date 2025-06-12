import React, { useState, useMemo, useCallback } from 'react';
import { produce } from 'immer';

interface User {
  name: string;
  settings: {
    theme: string;
    notifications: boolean;
  };
}

export const PerformancePatterns = () => {
  /**
   * 1. Aynı Değerle Set Etmek
   * ❌ Yanlış: setCount(count) - Aynı değerle set etmek gereksiz render'a neden olur
   * ✅ Doğru: Önce kontrol edip, değer farklıysa set etmek
   */
  const [count, setCount] = useState(0);
  
  /**
   * 2. Birden Fazla State Update
   * ❌ Yanlış: Her state güncellemesi için ayrı setState çağrısı yapmak
   *    - Her setState yeni bir render tetikler
   *    - Performans kaybına neden olur
   * 
   * ✅ Doğru: Tüm güncellemeleri tek bir setState içinde yapmak
   *    - Tek render tetiklenir
   *    - Daha performanslı
   */
  const [score, setScore] = useState({ points: 0, level: 1 });
  
  /**
   * 3. Derin Nesne Referansı
   * ❌ Yanlış: Spread operatörü ile manuel immutable update
   *    - Karmaşık nesnelerde zor ve hataya açık
   *    - Her seviye için spread gerekir
   * 
   * ✅ Doğru: Immer ile immutable update
   *    - Daha okunabilir kod
   *    - Hata yapma riski düşük
   *    - Performanslı
   */
  const [user, setUser] = useState<User>({
    name: "John",
    settings: {
      theme: "light",
      notifications: true
    }
  });

  /**
   * 4. Pahalı Hesaplamalar
   * ❌ Yanlış: Her render'da hesaplamayı tekrar yapmak
   *    - Her render'da gereksiz CPU kullanımı
   *    - Performans kaybı
   * 
   * ✅ Doğru: useMemo ile hesaplamayı cache'lemek
   *    - Sadece bağımlılıklar değiştiğinde hesaplanır
   *    - CPU kullanımından tasarruf
   */
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);

  // ✅ Doğru: Pahalı hesaplama için useMemo kullanımı
  const expensiveCalculation = useMemo(() => {
    return numbers.reduce((acc, num) => acc + Math.pow(num, 2), 0);
  }, [numbers]);

  // ❌ Yanlış: Her render'da gereksiz hesaplama
  const expensiveCalculationWrong = numbers.reduce((acc, num) => acc + Math.pow(num, 2), 0);

  // ✅ Doğru: State güncellemeden önce kontrol
  const handleCountUpdate = () => {
    const newCount = count + 1;
    if (newCount !== count) {
      setCount(newCount);
    }
  };

  // ✅ Doğru: Birden fazla state güncellemeyi birleştirme
  const handleScoreUpdate = () => {
    setScore(prev => ({
      points: prev.points + 10,
      level: prev.level + 1
    }));
  };

  // ❌ Yanlış: Birden fazla ayrı state güncelleme
  const handleScoreUpdateWrong = () => {
    setScore(prev => ({ ...prev, points: prev.points + 10 }));
    setScore(prev => ({ ...prev, level: prev.level + 1 }));
  };

  // ✅ Doğru: Immer ile immutable update
  const handleUserUpdate = () => {
    setUser(produce((draft: User) => {
      draft.settings.theme = draft.settings.theme === 'light' ? 'dark' : 'light';
    }));
  };

  // ❌ Yanlış: Referans değişikliği ile update
  const handleUserUpdateWrong = () => {
    setUser({
      ...user,
      settings: {
        ...user.settings,
        theme: user.settings.theme === 'light' ? 'dark' : 'light'
      }
    });
  };

  return (
    <div className="space-y-6 p-4 border rounded-lg">
      <h2 className="text-xl font-bold">Performance Patterns Demo</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">1. State Update Kontrolü</h3>
          <p>Count: {count}</p>
          <button 
            onClick={handleCountUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Increment
          </button>
        </div>

        <div>
          <h3 className="font-semibold">2. Birleştirilmiş State Updates</h3>
          <p>Score: {score.points} points, Level: {score.level}</p>
          <div className="space-x-2">
            <button 
              onClick={handleScoreUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Update Score (Doğru)
            </button>
            <button 
              onClick={handleScoreUpdateWrong}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Update Score (Yanlış)
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">3. Immer vs Manual Updates</h3>
          <p>Theme: {user.settings.theme}</p>
          <div className="space-x-2">
            <button 
              onClick={handleUserUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Toggle Theme (Doğru)
            </button>
            <button 
              onClick={handleUserUpdateWrong}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Toggle Theme (Yanlış)
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">4. Pahalı Hesaplamalar</h3>
          <p>Memoized Result: {expensiveCalculation}</p>
          <p>Non-memoized Result: {expensiveCalculationWrong}</p>
          <button 
            onClick={() => setNumbers([...numbers, numbers.length + 1])}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            Add Number
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerformancePatterns; 