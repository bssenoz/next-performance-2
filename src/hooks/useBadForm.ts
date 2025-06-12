import { useState, useEffect } from 'react';
import { useForm, useController, UseFormReturn } from 'react-hook-form';

// ❌ Her render'da yeniden oluşturulan array - Performans kaybı
// ✅ Doğrusu: Bu array'i component dışında statik olarak tanımlamak
export const SELECT_OPTIONS = ['Option 1', 'Option 2'];

interface FormValues {
  controlled: string;
  select: string;
  example: string;
  quantity: number;
}

interface UseBadFormReturn extends UseFormReturn<FormValues> {
  selectField: any; // ❌ 'any' kullanımı - Type safety yok
  total: number;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: string[];
}

export const useBadForm = (): UseBadFormReturn => {
  // ❌ Gereksiz state kullanımı - Form state zaten react-hook-form tarafından yönetiliyor
  const [localState, setLocalState] = useState<FormValues>({
    controlled: '',
    select: '',
    example: '',
    quantity: 0,
  });

  const methods = useForm<FormValues>({
    defaultValues: localState // ❌ Gereksiz state bağımlılığı
  });

  const { control, watch } = methods;

  // ❌ Her render'da options yeniden oluşturuluyor
  const options = SELECT_OPTIONS;

  // ❌ useController her render'da çağrılıyor - Performans kaybı
  // ✅ Doğrusu: useController'ı useMemo ile sarmak
  const { field: selectField } = useController({
    name: 'select',
    control,
  });

  // ❌ Gereksiz effect kullanımı - Form state'i zaten react-hook-form tarafından yönetiliyor
  useEffect(() => {
    setLocalState(prev => ({ ...prev, select: selectField.value }));
  }, [selectField.value]);

  // ❌ Her render'da yeniden oluşturulan callback - Performans kaybı
  // ✅ Doğrusu: useCallback ile memoize etmek
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setLocalState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ❌ watch kullanımı tüm formu yeniden render eder
  // ✅ Doğrusu: useWatch hook'unu kullanmak veya subscription'ları azaltmak
  const quantity = watch('quantity');
  
  // ❌ Her render'da yeniden hesaplanıyor
  // ✅ Doğrusu: useMemo ile hesaplamayı optimize etmek
  const total = quantity * 5;

  // ❌ Her render'da yeni bir obje oluşturuluyor
  // ✅ Doğrusu: Objeyi useMemo ile memoize etmek
  return {
    ...methods,
    selectField: {
      field: selectField,
    },
    total,
    handleInputChange,
    options,
  };
}; 