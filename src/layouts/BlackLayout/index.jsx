import styles from './style.module.scss';

function BlackLayout({ children }) {
  return (
    <div className={styles.blackLayout}>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}

export default BlackLayout;

