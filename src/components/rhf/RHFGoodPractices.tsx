'use client'

import React, { useState } from 'react'
import { useFormWithValidation } from '@/hooks/useFormWithValidation'

interface FormValues {
  email: string
  firstName: string
  lastName: string
  type: string
}

export default function RHFGoodPractices() {
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null)
  
  const { 
    register, 
    handleSubmit, 
    fullName,
    debouncedValidation 
  } = useFormWithValidation<FormValues>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      type: ''
    }
  })

  const onSubmit = (data: FormValues) => {
    setSubmittedData(data)
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4 bg-green-50 rounded-lg text-black mt-4">
      <h2 className="text-xl font-bold">✅ İyi Kullanım Örnekleri</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        <div>
          Tam İsim: {fullName}
        </div>

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