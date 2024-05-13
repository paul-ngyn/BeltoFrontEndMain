import React, { useEffect, useRef } from 'react';
import styles from './ResponseSection.module.css';

type Chat = {
  sender: string;
  text: string;
};

type ResponseSectionProps = {
  chatHistory: Chat[];
};

const ResponseSection: React.FC<ResponseSectionProps> = ({ chatHistory }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className={styles.responseContainer} ref={containerRef}>
      {chatHistory.map((chat, index) => (
        <div key={index} className={`${styles.message} ${chat.sender === 'user' ? styles.user : styles.bot}`}>
          <strong>{chat.sender}:</strong> {chat.text}
        </div>
      ))}
    </div>
  );
};

export default ResponseSection;