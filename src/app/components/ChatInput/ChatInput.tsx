import React, { useEffect, useRef } from 'react';
import styles from './ChatInput.module.css';

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ message, setMessage, handleSendMessage }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Handle auto-expanding textarea height
  useEffect(() => {
    const chatInput = inputRef.current;

    if (chatInput) {
      const handleInput = () => {
        chatInput.style.height = 'auto'; // Reset height
        chatInput.style.height = `${chatInput.scrollHeight}px`; // Adjust height based on content
      };

      chatInput.addEventListener('input', handleInput);

      // Initial height adjustment
      handleInput();

      // Cleanup event listener when the component unmounts
      return () => {
        chatInput.removeEventListener('input', handleInput);
      };
    }
  }, []);

  // Update the message state on change
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <textarea
      ref={inputRef}
      className={styles.ChatInput}
      placeholder="Type your prompt here..."
      value={message}
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}
      rows={1} // Start with a single row
    />
  );
};

export default ChatInput;