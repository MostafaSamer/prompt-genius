import { useState } from 'react';
import styles from './style.module.scss';

function SideMenuLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.sideMenuLayout}>
      <aside className={`${styles.sidebar} ${isMenuOpen ? styles.open : styles.closed}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>Menu</h2>
          <button 
            className={styles.toggleButton}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? '←' : '→'}
          </button>
        </div>
        <nav className={styles.sidebarNav}>
          <ul className={styles.navList}>
            {/* Navigation items can be added here */}
            <li className={styles.navItem}>
              <a href="#" className={styles.navLink}>Dashboard</a>
            </li>
            <li className={styles.navItem}>
              <a href="#" className={styles.navLink}>Prompt</a>
            </li>
            <li className={styles.navItem}>
              <a href="#" className={styles.navLink}>Settings</a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className={`${styles.main} ${isMenuOpen ? styles.mainWithSidebar : styles.mainFullWidth}`}>
        {children}
      </main>
    </div>
  );
}

export default SideMenuLayout;

