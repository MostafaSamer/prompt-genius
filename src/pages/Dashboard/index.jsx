import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import { Header } from '../../shared/components';

function Dashboard() {
  const navigate = useNavigate();

  const handleNewPrompt = () => {
    navigate('/prompt');
  };

  return (
    <div className={styles.dashboard}>
      <Header onNewPrompt={handleNewPrompt} />
    </div>
  );
}

export default Dashboard;

