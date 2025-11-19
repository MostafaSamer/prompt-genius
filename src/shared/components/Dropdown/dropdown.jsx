import Select from 'react-select';
import style from './dropdown.module.scss';

export const Dropdown = ({ label, options, onSelect }) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '100%',
      borderRadius: 10,
      border: '1px solid var(--border-color)',
      backgroundColor: 'var(--primary-bg)',
      fontSize: '0.95rem',
      padding: '0.2rem',
      cursor: 'pointer',
      color: 'var(--primary-text)',
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: '0.3rem',
      borderRadius: 10,
      border: '1px solid var(--border-color)',
      backgroundColor: 'var(--secondary-bg)',
      width: '100%',
    }),
    option: (provided, state) => ({
      ...provided,
      padding: '0.6em 1em',
      fontSize: '0.9rem',
      color: 'var(--primary-text)',
      backgroundColor: state.isFocused ? 'var(--hover-option-bg)' : 'var(--primary-bg)',
      cursor: 'pointer',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'var(--primary-text)',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'var(--secondary-text)',
    }),
  };

  return (
    <div className={style['dropdown-styles']}>
      <Select
        options={options}
        onChange={(selectedOption) => onSelect(selectedOption.value)}
        placeholder={label}
        styles={customStyles}
      />
    </div>
  );
};
