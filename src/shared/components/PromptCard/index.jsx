import styles from './style.module.scss';

function PromptCard({ title, description, onEdit, onDelete }) {
  return (
    <div className={styles.promptCard}>
      <div className={styles.promptContent}>
        <h3 className={styles.promptTitle}>{title}</h3>
        <p className={styles.promptDescription}>{description}</p>
      </div>
      <div className={styles.promptActions}>
        <button
          className={styles.editButton}
          onClick={onEdit}
          aria-label={`Edit ${title}`}
        >
          ✏️
        </button>
        <button
          className={styles.deleteButton}
          onClick={onDelete}
          aria-label={`Delete ${title}`}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default PromptCard;

