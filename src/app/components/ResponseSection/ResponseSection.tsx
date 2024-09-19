import React, { useEffect, useRef } from 'react';
import styles from './ResponseSection.module.css';
import ReactionComponent from '../Reaction/ReactionComponent';

type Chat = {
  sender: string;
  text: string;
};

type ResponseSectionProps = {
  chatHistory: Chat[];
  onReact: (index: number, reaction: string) => void; // New prop for reacting to a message
  onStop: () => void; // New prop for stopping the message generation
};



const ResponseSection: React.FC<ResponseSectionProps> = ({ chatHistory, onReact, onStop }) => {
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
          {/* Action buttons */}
          {chat.sender === 'bot' && (
            <div className={styles.actionButtons}>
              <button className={styles.button} onClick={() => onReact(index, 'like')}>👍 Like</button>
              <button className={styles.button} onClick={() => onReact(index, 'dislike')}>👎 Dislike</button>
              <button className={styles.button} onClick={() => onStop()}>🛑 Stop</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResponseSection;