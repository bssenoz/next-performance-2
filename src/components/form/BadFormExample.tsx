'use client'

import React, { memo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useBadForm, SELECT_OPTIONS } from '@/hooks/useBadForm';

// Optimize Select component with memo and proper key usage
const BadSelect = memo(({ field }: { field: any }) => {
  return (
    <select 
      {...field} 
      className="border p-2 rounded"
    >
      <option value="">Select...</option>
      {SELECT_OPTIONS.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
});

BadSelect.displayName = 'BadSelect';

const BadInputGroup = () => {
  const { handleInputChange } = useBadForm();
  const { register } = useForm();

  return (
    <div className="space-y-2">
      <input
        {...register("example")}
        onChange={handleInputChange}
        className="border p-2 rounded"
        placeholder="Bad subscription example"
      />
    </div>
  );
};

const BadWatchExample = () => {
  const { selectField: { field }, total } = useBadForm();

  return (
    <div className="space-y-2">
      <input
        type="number"
        {...field}
        className="border p-2 rounded"
      />
      <p className="text-sm">Calculated Total (5x): {total}</p>
    </div>
  );
};

const BadFormExample = () => {
  const { register, selectField, handleSubmit } = useBadForm();

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
          />
        </div>

        <div>
          <h3 className="font-semibold mb-2">2. Bad Select</h3>
          <BadSelect field={selectField.field} />
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