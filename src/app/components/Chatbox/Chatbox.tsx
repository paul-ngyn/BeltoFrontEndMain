import React, { useState } from 'react';
import styles from './Chatbox.module.css'; 
import Monitor from '../MonitorLogo/MonitorLogo';
import PaperClip from '../PaperClip/PaperClip';
import ChatInput from '../ChatInput/ChatInput';
import SubmitButton from '../SubmitButton/SubmitButton';
import ChatService from '../../services/ChatService';

type ChatboxProps = {
  chatHistory: { text: string; sender: string; }[];
  setChatHistory: React.Dispatch<React.SetStateAction<{ text: string; sender: string; }[]>>;
  onMessageSend: () => void;
  messageSent: boolean;
};

const Chatbox: React.FC<ChatboxProps> = ({ chatHistory, setChatHistory, onMessageSend, messageSent }) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = async () => {
      
      setChatHistory(prev => [...prev, { text: message, sender: 'user' }]); //Insted of pulling from ...chatHistory, I'm pulling from prev
      try {
        const response = await ChatService.createCompletion({ text: message, sender: 'user' });  //This sends the user's message to the server
        const responseContent = response.data.content; //This gets the response from the server
        setChatHistory(prev => [...prev, { text: responseContent, sender: 'server' }]); //This adds the server's response to the chat history, I changed  variable to responseContent
      } catch (error) {
        console.error('Error sending message:', error);
        setChatHistory(prev => [...prev, { text: "Sorry, there was an error processing your request.", sender: 'server' }]); // added some error handling here
      }
      onMessageSend();//moved this line of code so that the chatbox scrolls to the bottom after the message is sent
      setMessage(''); //This clears the message input after the message is sent
    };

    return (
      <div className={`${styles.Chatbox} ${messageSent ? styles.ChatboxBottom : ''}`}>
        <Monitor/>
        <PaperClip/>
        <ChatInput message={message} setMessage={setMessage} handleSendMessage={handleSendMessage} />
        <SubmitButton handleSendMessage={handleSendMessage} />
      </div>
    );
};

export default Chatbox;