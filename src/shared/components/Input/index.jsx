import styles from './style.module.scss';

function Input({
  type = 'text',
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  rows = 4,
  disabled = false,
}) {
  const inputId = `input-${name}`;

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          className={`${styles.input} ${styles.textarea} ${error ? styles.error : ''}`}
          required={required}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`${styles.input} ${error ? styles.error : ''}`}
          required={required}
        />
      )}
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}

export default Input;

