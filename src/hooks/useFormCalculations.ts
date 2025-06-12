import { Control, useWatch } from 'react-hook-form';
import { useMemo } from 'react';


interface UseFormCalculationsProps {
  control: Control<any>;
}

interface UseFormCalculationsReturn {
  quantity: number;
  total: number;
}

// ✅ Doğru Kullanımlar:
// 1. useWatch hook'u ile verimli state takibi
// 2. useMemo ile gereksiz hesaplamaların önlenmesi
// 3. Tip güvenliği için TypeScript interface'leri
// 4. Modüler ve tekrar kullanılabilir yapı

// ❌ Kaçınılması Gerekenler:
// 1. watch hook'u kullanmak (useWatch yerine)
// 2. Memoization kullanmamak
// 3. Tip tanımlamalarını atlama
// 4. Her form değişikliğinde yeniden hesaplama

export const useFormCalculations = ({ control }: UseFormCalculationsProps): UseFormCalculationsReturn => {
  // ✅ useWatch ile sadece quantity değişikliklerini izle
  const quantity = useWatch({
    control,
    name: "quantity"
  });

  // ✅ useMemo ile hesaplama optimizasyonu
  const total = useMemo(() => quantity * 5, [quantity]);

  return {
    quantity,
    total
  };
};