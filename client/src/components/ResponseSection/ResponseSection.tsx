import React, { useEffect, useRef } from 'react';
import styles from './ResponseSection.module.css';

type Chat = {
  role: string;
  content: string;
};

type ResponseSectionProps = {
  chatHistory: Chat[];
};

const ResponseSection: React.FC<ResponseSectionProps> = ({ chatHistory }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This effect updates the scroll position to the bottom of the container every time chatHistory changes
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className={styles.responseContainer} ref={containerRef}>
      {chatHistory.map((chat, index) => (
        <div key={index} className={`${styles.message} ${chat.role === 'user' ? styles.user : styles.bot}`}>
          <strong>{chat.role}:</strong> {chat.content}
        </div>
      ))}
    </div>
  );
};

export default ResponseSection;