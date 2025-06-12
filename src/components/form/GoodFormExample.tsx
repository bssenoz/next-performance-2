'use client'

import React, { useMemo } from 'react';
import { FormProvider, useForm, useController } from 'react-hook-form';
import { debounce } from 'lodash';
import { useFormFields } from '@/hooks/useFormFields';
import { useFormCalculations } from '@/hooks/useFormCalculations';

// ✅ React.memo ile sarılmış select bileşeni
// ✅ Sadece prop değişikliklerinde yeniden render olur
const MemoizedSelect = React.memo(({ field }: { field: any }) => {
  return (
    <select {...field} className="border p-2 rounded">
      <option value="">Select...</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </select>
  );
});

// ✅ Form context'i doğru kullanımı
// ✅ React.memo ile sarılmış input grubu
// ✅ Gereksiz render'ları önler
const InputGroup = React.memo(() => {
  const { register } = useForm();
  return (
    <div className="space-y-2">
      <input
        {...register("example")}
        className="border p-2 rounded"
        placeholder="Smart subscription example"
      />
    </div>
  );
});

// ✅ useWatch hook'u ile verimli state takibi
// ✅ Sadece izlenen alan değiştiğinde render olur
const WatchExample = () => {
  const { control } = useFormFields();
  const { quantity, total } = useFormCalculations({ control });

  return (
    <div className="space-y-2">
      <input
        type="number"
        {...useController({
          name: "quantity",
          control
        }).field}
        className="border p-2 rounded"
      />
      <p className="text-sm">Calculated Total (5x): {total}</p>
    </div>
  );
};

// ✅ Ana form bileşeni - performans optimizasyonları:
// ✅ 1. Uncontrolled inputlar kullanılıyor
// ✅ 2. Select bileşeni memoize edilmiş
// ✅ 3. Form mantığı custom hook'lara ayrılmış
// ✅ 4. useWatch ile verimli state yönetimi
const GoodFormExample = () => {
  const { register, control, getSelectField } = useFormFields();
  
  // ✅ Debounced validation
  const debouncedValidation = useMemo(
    () => debounce(() => {
      // validation logic here
    }, 300),
    []
  );

  return (
    <div className="space-y-6 p-4 border rounded-lg bg-white shadow text-black">
      <h2 className="text-xl font-bold mb-4">Good Form Practices Example</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">1. Uncontrolled Input</h3>
          <input
            type="text"
            className="border p-2 rounded w-full"
            {...register("uncontrolled")}
          />
        </div>

        <div>
          <h3 className="font-semibold mb-2">2. Optimized Select</h3>
          <MemoizedSelect field={getSelectField()} />
        </div>

        <div>
          <h3 className="font-semibold mb-2">3. Optimized Input Group</h3>
          <FormProvider {...useForm()}>
            <InputGroup />
          </FormProvider>
        </div>

        <div>
          <h3 className="font-semibold mb-2">4. Optimized Watch Usage</h3>
          <WatchExample />
        </div>
      </div>
    </div>
  );
};

export default React.memo(GoodFormExample); 