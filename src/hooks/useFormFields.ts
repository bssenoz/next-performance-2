import { useForm, useController, Control, UseFormRegister } from 'react-hook-form';
import { useMemo } from 'react';

interface FormFields {
  uncontrolled: string;
  select: string;
  example: string;
  quantity: number;
}

interface UseFormFieldsReturn {
  register: UseFormRegister<FormFields>;
  control: Control<FormFields>;
  getSelectField: () => any;
}

export const useFormFields = (): UseFormFieldsReturn => {
  const { register, control } = useForm<FormFields>({
    mode: "onBlur",
    defaultValues: useMemo(() => ({
      uncontrolled: "",
      select: "",
      example: "",
      quantity: 0
    }), [])
  });

  const { field: selectField } = useController({
    name: "select",
    control,
  });

  const getSelectField = () => useMemo(() => selectField, [selectField.value]);

  return {
    register,
    control,
    getSelectField
  };
}; 