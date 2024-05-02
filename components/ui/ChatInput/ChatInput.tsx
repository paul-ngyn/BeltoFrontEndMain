import React from 'react';
import styles from './ChatInput.module.css'; // Adjust the import path as necessary

interface ChatInputProps {
    placeholder?: string;
  }
  
  // Functional component with props
  const ChatInput: React.FC<ChatInputProps> = ({ placeholder = "Type your prompt here..." }) => {
    return (
      <input
        className = {styles.ChatInput}
        placeholder={placeholder}
        type="text"
      />
    );
  };
  
  export default ChatInput;