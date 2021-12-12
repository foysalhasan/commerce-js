import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const InputText = ({ name, placeholder }) => {
  const { control } = useFormContext()
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <input {...field} className="bg-gray-200 outline-none rounded-sm px-3 py-2 text-sm text-medium" placeholder={placeholder} required />
      )}
    />
  )
}

export default InputText
