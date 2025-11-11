import { useState, cloneElement, isValidElement } from 'react';
import styles from './style.module.scss';

function Form({ onSubmit, onCancel, children, initialValues = {} }) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

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

  const validate = (data) => {
    const newErrors = {};

    if (!data.title || data.title.trim() === '') {
      newErrors.title = 'Prompt Title is required';
    }

    if (!data.description || data.description.trim() === '') {
      newErrors.description = 'Description is required';
    }

    if (!data.promptBody || data.promptBody.trim() === '') {
      newErrors.promptBody = 'Prompt Body is required';
    }

    return newErrors;
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

  // Clone children and inject props
  const childrenWithProps = Array.isArray(children)
    ? children.map((child, index) => {
        if (isValidElement(child) && child.props.name) {
          return cloneElement(child, {
            key: child.key || index,
            value: formData[child.props.name] || '',
            onChange: handleChange,
            error: errors[child.props.name] || '',
          });
        }
        return child;
      })
    : isValidElement(children) && children.props.name
      ? cloneElement(children, {
          value: formData[children.props.name] || '',
          onChange: handleChange,
          error: errors[children.props.name] || '',
        })
      : children;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formFields}>{childrenWithProps}</div>
      <div className={styles.formActions}>
        <button type="button" className={styles.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className={styles.submitButton}>
          Save Prompt
        </button>
      </div>
    </form>
  );
}

export default Form;

