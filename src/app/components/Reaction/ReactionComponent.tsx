import React, { useState } from 'react';
import ResponseSection from '../ResponseSection/ResponseSection';

const ReactionComponent = () => {
  const [chatHistory, setChatHistory] = useState([
    { sender: 'user', text: 'Hello' },
    { sender: 'bot', text: 'Hi, how can I assist you today?' }
  ]);

  const handleReact = (index: number, reaction: string) => {
    console.log(`Reacted to message ${index} with ${reaction}`);
    // Add logic for handling reactions
  };

  const handleStop = () => {
    console.log('Message generation stopped');
    // Add logic to stop generation
  };

  return (
    <ResponseSection
      chatHistory={chatHistory}
      onReact={handleReact}
      onStop={handleStop}
    />
  );
};

export default ReactionComponent;