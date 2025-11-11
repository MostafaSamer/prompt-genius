import { useState } from 'react';
import styles from './style.module.scss';
import { Header, Modal, Form, Input } from '../../shared/components';

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewPrompt = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSavePrompt = (formData) => {
    console.log('Saving prompt:', formData);
    // TODO: Implement actual save logic (e.g., API call, localStorage, etc.)
    setIsModalOpen(false);
  };

  return (
    <div className={styles.dashboard}>
      <Header onNewPrompt={handleNewPrompt} />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Create New Prompt"
      >
        <Form onSubmit={handleSavePrompt} onCancel={handleCloseModal}>
          <Input
            type="text"
            label="Prompt Title"
            name="title"
            placeholder="e.g., Social Media Ad Copy"
            required
          />
          <Input
            type="text"
            label="Description"
            name="description"
            placeholder="A short description of what this prompt does."
            required
          />
          <Input
            type="textarea"
            label="Prompt Body"
            name="promptBody"
            placeholder="Generate compelling ad copy for a {{product_name}} targeting {{audience_demographic}}. Use dynamic variables with double curly braces."
            rows={6}
            required
          />
        </Form>
      </Modal>
    </div>
  );
}

export default Dashboard;

