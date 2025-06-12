import { useForm, UseFormProps, FieldValues, UseFormReturn, useWatch } from 'react-hook-form'
import { useMemo } from 'react'
import debounce from 'lodash/debounce'

interface UseFormWithValidationProps<T extends FieldValues> extends UseFormProps<T> {
  validationDelay?: number
}

export function useFormWithValidation<T extends FieldValues>({
  validationDelay = 300,
  ...formProps
}: UseFormWithValidationProps<T>): UseFormReturn<T> & {
  fullName: string
  debouncedValidation: () => void
} {
  // defaultValues memoize edildi
  const methods = useForm<T>({
    ...formProps,
    defaultValues: useMemo(() => formProps.defaultValues, [])
  })

  const values = useWatch({ control: methods.control })
  
  //  Gereksiz hesaplama önlendi
  const fullName = useMemo(() => {
    if ('firstName' in values && 'lastName' in values) {
      return `${values.firstName} ${values.lastName}`
    }
    return ''
  }, [values])

  // alidation debounce edildi
  const debouncedValidation = useMemo(
    () => debounce(() => {
      methods.trigger()
    }, validationDelay),
    [methods, validationDelay]
  )

  return {
    ...methods,
    fullName,
    debouncedValidation
  }
} 