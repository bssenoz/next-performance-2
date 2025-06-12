'use client'

import React, { useState } from 'react';
import { useForm, useController, FormProvider } from 'react-hook-form';

// ❌ Her render'da yeniden oluşturulan dizi - performans kaybına neden olur
// ❌ Statik bir dizi olmalı ve component dışında tanımlanmalı
const options = Array.from({ length: 2 }, (_, i) => `Option ${i + 1}`);

// ❌ Gereksiz yerel state kullanımı
// ❌ Form state'i zaten react-hook-form tarafından yönetiliyor, ekstra state gereksiz
const BadSelect = ({ field }: { field: any }) => {
  const [localValue, setLocalValue] = useState(field.value);
  
  return (
    <select 
      {...field} 
      value={localValue}
      onChange={(e) => {
        setLocalValue(e.target.value);
        field.onChange(e);
      }}
      className="border p-2 rounded"
    >
      <option value="">Select...</option>
      {options.map(opt => (
        // ❌ Random key usage
        <option key={Math.random()} value={opt}>{opt}</option>
      ))}
    </select>
  );
};

// ❌ Her render'da yeni bir callback oluşturuluyor
// ❌ useCallback ile memoize edilmeli veya component dışına alınmalı
const BadInputGroup = () => {
  const { register } = useForm();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <div className="space-y-2">
      <input
        {...register("example")}
        onChange={handleChange}
        className="border p-2 rounded"
        placeholder="Bad subscription example"
      />
    </div>
  );
};

// ❌ Verimsiz watch kullanımı
// ❌ Her değişiklikte tüm component yeniden render olur
// ❌ useWatch hook'u kullanılmalı ve hesaplamalar useMemo ile optimize edilmeli
const BadWatchExample = () => {
  const { control, watch } = useForm({
    defaultValues: {
      quantity: 0
    }
  });

  const quantity = watch("quantity");
  const total = quantity * 5;

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

// ❌ Ana form bileşeni - performans sorunları:
// ❌ 1. Gereksiz controlled input kullanımı - uncontrolled kullanılmalı
// ❌ 2. Select bileşeni memo edilmemiş
// ❌ 3. FormProvider gereksiz yere her alt bileşen için yeniden oluşturuluyor
// ❌ 4. Watch kullanımı optimize edilmemiş
const BadFormExample = () => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      controlled: "",
      select: "",
    }
  });

  const { field } = useController({
    name: "select",
    control,
  });

  return (
    <div className="space-y-6 p-4 border rounded-lg bg-white shadow text-black">
      <h2 className="text-xl font-bold mb-4">Bad Form Practices Example</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">1. Controlled Input</h3>
          <input
            type="text"
            className="border p-2 rounded w-full"
            {...register("controlled")}
            onChange={(e) => {
              field.onChange(e);
            }}
          />
        </div>

        <div>
          <h3 className="font-semibold mb-2">2. Bad Select</h3>
          <BadSelect field={field} />
        </div>

        <div>
          <h3 className="font-semibold mb-2">3. Bad Input Group</h3>
          <FormProvider {...useForm()}>
            <BadInputGroup />
          </FormProvider>
        </div>

        <div>
          <h3 className="font-semibold mb-2">4. Bad Watch Usage</h3>
          <BadWatchExample />
        </div>
      </div>
    </div>
  );
};

export default BadFormExample; 