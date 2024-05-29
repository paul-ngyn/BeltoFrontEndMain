import React from 'react';
import styles from './SubmitButton.module.css'
import Image from 'next/image';

interface SubmitButtonProps {
  handleSendMessage: () => void;
}

// Define the component as a functional component
const SubmitButton: React.FC<SubmitButtonProps> = ({ handleSendMessage }) => {
  return (
    <button type="submit" className={styles.Submitbutton} onClick={handleSendMessage}>
      <Image className={styles.Submit} alt="" src="/assets/SubmitButton.svg" width={21} height={21} />
    </button>
  );
};

export default SubmitButton;