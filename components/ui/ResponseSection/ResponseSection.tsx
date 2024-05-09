import React from 'react';
import styles from './ResponseSection.module.css';

type Chat = {
  sender: string;
  text: string;
};

type ResponseSectionProps = {
  chatHistory: Chat[];
};

const ResponseSection: React.FC<ResponseSectionProps> = ({ chatHistory }) => {
  return (
    <div className="responseSection">
      {chatHistory.map((chat, index) => (
        <p key={index} className={chat.sender === 'user' ? 'userMessage' : 'botMessage'}>
          <b>{chat.sender}:</b> {chat.text}
        </p>
      ))}
    </div>
  );
};

export default ResponseSection;