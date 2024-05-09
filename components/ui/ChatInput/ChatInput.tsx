import React from 'react';
import styles from './ChatInput.module.css';

type Chat = {
    sender: string;
    text: string;
  };

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ message, setMessage }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <input
      className={styles.ChatInput}
      placeholder="Type your prompt here..."
      type="text"
      value={message}
      onChange={handleInputChange}
    />
  );
};

export default ChatInput;