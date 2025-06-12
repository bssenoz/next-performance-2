import React, { useRef, useEffect } from 'react';
import { useBadStore } from '../store/badStore'
import type { BadStoreState } from '../store/badStore'

// Count için ayrı bir component - ama tüm store'u prop olarak alıyor
const CountSection = ({ store }: { store: BadStoreState }) => {
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current += 1
    console.log('Bad: CountSection render oldu:', renderCount.current, 'kez')
  })

  return (
    <div className="p-4 border rounded-lg bg-green-50 text-black">
      <div className="absolute -top-6 left-0 text-sm text-gray-500">
        CountSection render: {renderCount.current}
      </div>
      <h3 className="text-lg font-semibold mb-2">Sayaç</h3>
      <div className="flex items-center gap-4">
        <button
          onClick={store.increment}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Artır
        </button>
        <span className="text-xl font-bold">{store.count}</span>
      </div>
    </div>
  )
}

// Text için ayrı bir component - ama tüm store'u prop olarak alıyor
const TextSection = ({ store }: { store: BadStoreState }) => {
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current += 1
    console.log('Bad: TextSection render oldu:', renderCount.current, 'kez')
  })

  return (
    <div className="p-4 border rounded-lg bg-green-50 text-black">
      <div className="absolute -top-6 left-0 text-sm text-gray-500">
        TextSection render: {renderCount.current}
      </div>
      <h3 className="text-lg font-semibold mb-2">Metin</h3>
      <input
        type="text"
        value={store.text}
        onChange={(e) => store.setText(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        placeholder="Metin girin..."
      />
    </div>
  )
}

// Ana component - tüm store'u burada alıyor ve alt componentlere prop olarak geçiyor
export const BadCounter = () => {
  const renderCount = useRef(0);
  // Tüm store'u burada alıyoruz - bu kötü performansa neden olacak
  const store = useBadStore()

  useEffect(() => {
    renderCount.current += 1;
    console.log('BadCounter render oldu:', renderCount.current, 'kez');
  });

  return (
    <div className="p-4 border rounded-lg bg-white text-black">
      <div className="absolute -top-6 left-0 text-sm text-gray-500">
        BadCounter render: {renderCount.current}
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">BadCounter</h3>
        <p className="text-sm text-gray-600 mb-2">
          Bu komponent her state değişikliğinde yeniden render olur çünkü:
          1. Tüm store'u tek seferde alıyor (selector kullanmıyor)
          2. React.memo kullanmıyor
          3. Alt componentlere tüm store'u prop olarak geçiyor
        </p>
      </div>

      <div className="space-y-4">
        <CountSection store={store} />
        <TextSection store={store} />
      </div>
    </div>
  )
} 