import React from 'react';
import styles from './PaperClip.module.css'
import Image from 'next/image';

// Define the component as a functional component
const PaperClip: React.FC = () => {
  return (
    <button className= {styles.Paperclipbutton}>
      <Image className="Paperclip" alt="" src="/assets/prompt-chat-field--alternativepapercliphorizontal@2x.png" width = {24} height = {24} />
      </button>
  );
};

export default PaperClip;