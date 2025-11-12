import { Dropdown } from '../../shared/components/Dropdown/dropdown';
import styles from './style.module.scss';

function Prompt() {
    const dropdownOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];
  return (
    <div className={styles.prompt}>
      <h1>Prompt</h1>
      <p>Welcome to the Prompt page</p>
        <Dropdown
        label="Select Option"
        options={dropdownOptions}
        onSelect={(value) => console.log('Selected value:', value)}
      />
    </div>
  );
}

export default Prompt;

