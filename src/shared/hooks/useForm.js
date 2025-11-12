import { useState } from 'react';

function useForm({ inputs = [], initialValues = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const newErrors = {};

    inputs.forEach((input) => {
      if (input.required) {
        const value = data[input.name];
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          newErrors[input.name] = input.validationMessage || `${input.label} is required`;
        }
      }
    });

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
  };

  const handleCancel = () => {
    setFormData(initialValues);
    setErrors({});
    if (onCancel) {
      onCancel();
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    handleCancel,
    setFormData,
    setErrors,
  };
}

export default useForm;

