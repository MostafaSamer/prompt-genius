import styles from './style.module.scss';
import Input from '../Input';
import useForm from '../../hooks/useForm';

function Form({ onSubmit, onCancel, inputs = [], initialValues = {}, submitButtonText = 'Save Prompt' }) {
  const { formData, errors, handleChange, handleSubmit, handleCancel } = useForm({
    inputs,
    initialValues,
    onSubmit,
    onCancel,
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formFields}>
        {inputs.map((input) => (
          <Input
            key={input.name}
            type={input.type || 'text'}
            label={input.label}
            name={input.name}
            placeholder={input.placeholder}
            required={input.required || false}
            rows={input.rows}
            value={formData[input.name] || ''}
            onChange={handleChange}
            error={errors[input.name] || ''}
          />
        ))}
      </div>
      <div className={styles.formActions}>
        <button type="button" className={styles.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className={styles.submitButton}>
          {submitButtonText}
        </button>
      </div>
    </form>
  );
}

export default Form;

