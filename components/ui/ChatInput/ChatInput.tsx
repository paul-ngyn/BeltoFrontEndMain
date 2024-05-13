import React from 'react';
import styles from './ChatInput.module.css';

type Chat = {
    sender: string;
    text: string;
};

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => void; // Add this line
}

const ChatInput: React.FC<ChatInputProps> = ({ message, setMessage, handleSendMessage }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      handleSendMessage(); // Call handleSendMessage when Enter is pressed
    }
  };

  return (
    <input
      className={styles.ChatInput}
      placeholder="Type your prompt here..."
      type="text"
      value={message}
      onChange={handleInputChange}
      onKeyPress={handleKeyPress} // Add this line
    />
  );
};

export default ChatInput;