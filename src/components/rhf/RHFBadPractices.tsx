'use client'

import React, { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

export default function RHFBadPractices() {
  const { register, control, handleSubmit, trigger, setValue: setFormValue } = useForm()
  const [value, setValue] = useState("")
  const [submittedData, setSubmittedData] = useState<any>(null)

  // ❌ KÖTÜ: Her değişiklikte validation
  const onChangeValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    setFormValue('email', newValue) // Form state'ini güncelle
    trigger("email") // Her değişiklikte validation tetiklenir
  }

  // ❌ KÖTÜ: useWatch'un yanlış kullanımı
  const firstName = useWatch({ control, name: "firstName" })
  const lastName = useWatch({ control, name: "lastName" })
  const email = useWatch({ control, name: "email" })
  // Her useWatch çağrısı bileşeni yeniden render eder

  const onSubmit = (data: any) => {
    setSubmittedData(data)
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4 bg-red-50 rounded-lg text-black">
      <h2 className="text-xl font-bold">❌ Kötü Kullanım Örnekleri</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* ❌ KÖTÜ: Controlled input gereksiz render'a neden olur */}
        <div>
          <label>Email (Controlled Input - Kötü)</label>
          <input 
            value={value}
            onChange={onChangeValidation}
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

        {/* ❌ KÖTÜ: Her seferinde yeni referans oluşturma */}
        <div>
          <label>Tip</label>
          <select {...register("type")} onChange={() => trigger("type")} className="border p-2 w-full">
            <option value="">Seç...</option>
            <option value="1">Bir</option>
          </select>
        </div>

        {/* ❌ KÖTÜ: Gereksiz watch kullanımı */}
        <div>
          Tam İsim: {firstName} {lastName}
          <br />
          Email: {email}
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