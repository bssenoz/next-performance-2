'use client'

import React, { useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import debounce from 'lodash/debounce'

export default function RHFGoodPractices() {
  const [submittedData, setSubmittedData] = useState<any>(null)
  const { register, control, handleSubmit } = useForm({
    // ✅ İYİ: defaultValues memoize edilmiş
    defaultValues: useMemo(() => ({
      email: '',
      firstName: '',
      lastName: '',
      type: ''
    }), [])
  })

  // ✅ İYİ: Tek useWatch ile tüm değerleri izleme
  const values = useWatch({ control })
  const fullName = useMemo(() => 
    `${values.firstName} ${values.lastName}`,
    [values.firstName, values.lastName]
  )

  // ✅ İYİ: Validation debounce edilmiş
  const debouncedValidation = useMemo(
    () => debounce(() => {
      // validation logic
    }, 300),
    []
  )

  const onSubmit = (data: any) => {
    setSubmittedData(data)
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4 bg-green-50 rounded-lg text-black mt-4">
      <h2 className="text-xl font-bold">✅ İyi Kullanım Örnekleri</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* ✅ İYİ: Uncontrolled input */}
        <div>
          <label>Email</label>
          <input 
            {...register("email")}
            onChange={(e) => {
              register("email").onChange(e)
              debouncedValidation()
            }}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>Ad</label>
          <input 
            {...register("firstName")}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>Soyad</label>
          <input 
            {...register("lastName")}
            className="border p-2 w-full"
          />
        </div>

        {/* ✅ İYİ: Memoize edilmiş değer kullanımı */}
        <div>
          Tam İsim: {fullName}
        </div>

        {/* ✅ İYİ: Performanslı select kullanımı */}
        <div>
          <label>Tip</label>
          <select {...register("type")} className="border p-2 w-full">
            <option value="">Seç...</option>
            <option value="1">Bir</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Gönder
        </button>
      </form>

      {submittedData && (
        <div className="mt-4">
          <h3 className="font-bold">Form Verileri:</h3>
          <pre className="bg-white p-2 rounded mt-2">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
} 