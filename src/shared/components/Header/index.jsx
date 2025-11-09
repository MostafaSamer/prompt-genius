import styles from './style.module.scss';

function Header({ onNewPrompt }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.leftSection}>
          <div className={styles.icon}>◆</div>
          <h1 className={styles.brand}>Prompt Genius</h1>
        </div>
        <div className={styles.rightSection}>
          <button className={styles.newPromptButton} onClick={onNewPrompt}>
            <span className={styles.plusIcon}>+</span>
            <span>New Prompt</span>
          </button>
          <div className={styles.avatar}></div>
        </div>
      </div>
    </header>
  );
}

export default Header;

