import React, { useRef, useEffect } from 'react';
import { useCount, useText, useIncrement, useSetText } from '../../store/goodStore'

// Alt komponentler - her biri sadece ihtiyacı olan state'i alıyor
const CountSection = React.memo(() => {
  const count = useCount()
  const increment = useIncrement()
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current += 1
    console.log('Good: CountSection render oldu:', renderCount.current, 'kez')
  })

  return (
    <div className="p-4 border rounded-lg bg-green-50 text-black">
      <div className="absolute -top-6 left-0 text-sm text-gray-500">
        CountSection render: {renderCount.current}
      </div>
      <h3 className="text-lg font-semibold mb-2">Sayaç</h3>
      <div className="flex items-center gap-4">
        <button
          onClick={increment}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Artır
        </button>
        <span className="text-xl font-bold">{count}</span>
      </div>
    </div>
  )
})

const TextSection = React.memo(() => {
  const text = useText()
  const setText = useSetText()
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current += 1
    console.log('Good: TextSection render oldu:', renderCount.current, 'kez')
  })

  return (
    <div className="p-4 border rounded-lg bg-green-50 text-black">
      <div className="absolute -top-6 left-0 text-sm text-gray-500">
        TextSection render: {renderCount.current}
      </div>
      <h3 className="text-lg font-semibold mb-2">Metin</h3>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        placeholder="Metin girin..."
      />
    </div>
  )
})

// Ana komponent - hiçbir state kullanmıyor
export const GoodCounter = React.memo(() => {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    console.log('GoodCounter render oldu:', renderCount.current, 'kez');
  });

  return (
    <div className="p-4 border rounded-lg bg-white text-black">
      <div className="absolute -top-6 left-0 text-sm text-gray-500">
        GoodCounter render: {renderCount.current}
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">GoodCounter</h3>
        <p className="text-sm text-gray-600 mb-2">
          Bu komponent React.memo ile sarıldığı için sadece kendi state'i değiştiğinde render olur.
          Alt komponentler de memoize edildiği için sadece ilgili state değiştiğinde render olurlar.
        </p>
      </div>

      <div className="space-y-4">
        <CountSection />
        <TextSection />
      </div>
    </div>
  );
}); 