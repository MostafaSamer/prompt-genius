import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import { Header, Modal, Form, Input, PromptCard } from '../../shared/components';

// Mock data for prompts
const MOCK_PROMPTS = [
  {
    id: '1',
    title: 'Social Media Ad Copy',
    description: 'Generate compelling ad copy for a {{product_name}} targeting {{audience_demographic}}.',
    promptBody: 'Generate compelling ad copy for a {{product_name}} targeting {{audience_demographic}}.',
  },
  {
    id: '2',
    title: 'Blog Post Outline',
    description: 'Create a structured outline for a blog post about {{topic}} with {{number_of_sections}} sections.',
    promptBody: 'Create a structured outline for a blog post about {{topic}} with {{number_of_sections}} sections.',
  },
  {
    id: '3',
    title: 'Sales Follow-Up Email',
    description: 'Draft a professional follow-up email to a potential client {{client_name}} after a {{meeting_type}}.',
    promptBody: 'Draft a professional follow-up email to a potential client {{client_name}} after a {{meeting_type}}.',
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [promptToDelete, setPromptToDelete] = useState(null);
  const [prompts] = useState(MOCK_PROMPTS);

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

  const handleEditPrompt = (promptId) => {
    navigate(`/prompt/${promptId}`);
  };

  const handleDeleteClick = (promptId) => {
    setPromptToDelete(promptId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (promptToDelete) {
      console.log('Deleting prompt:', promptToDelete);
      // TODO: Implement actual delete logic (e.g., API call, localStorage, etc.)
      setIsDeleteModalOpen(false);
      setPromptToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setPromptToDelete(null);
  };

  return (
    <div className={styles.dashboard}>
      <Header onNewPrompt={handleNewPrompt} />
      
      <div className={styles.content}>
        <h1 className={styles.heading}>Your Prompt Library</h1>
        
        <div className={styles.searchWrapper}>
          <Input
            type="text"
            label=""
            name="search"
            value=""
            placeholder="Filter prompts by name or tag"
            disabled
          />
        </div>

        <div className={styles.promptList}>
          {prompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              title={prompt.title}
              description={prompt.description}
              onEdit={() => handleEditPrompt(prompt.id)}
              onDelete={() => handleDeleteClick(prompt.id)}
            />
          ))}
        </div>
      </div>
      
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Create New Prompt"
      >
        <Form
          onSubmit={handleSavePrompt}
          onCancel={handleCloseModal}
          inputs={[
            {
              type: 'text',
              label: 'Prompt Title',
              name: 'title',
              placeholder: 'e.g., Social Media Ad Copy',
              required: true,
            },
            {
              type: 'text',
              label: 'Description',
              name: 'description',
              placeholder: 'A short description of what this prompt does.',
              required: true,
            },
            {
              type: 'textarea',
              label: 'Prompt Body',
              name: 'promptBody',
              placeholder: 'Generate compelling ad copy for a {{product_name}} targeting {{audience_demographic}}. Use dynamic variables with double curly braces.',
              rows: 6,
              required: true,
            },
          ]}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        title="Delete Prompt"
      >
        <div className={styles.deleteModalContent}>
          <p>Are you sure you want to delete this prompt? This action cannot be undone.</p>
          <div className={styles.deleteModalActions}>
            <button
              className={styles.deleteConfirmButton}
              onClick={handleDeleteConfirm}
            >
              Delete
            </button>
            <button
              className={styles.deleteCancelButton}
              onClick={handleDeleteCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Dashboard;

