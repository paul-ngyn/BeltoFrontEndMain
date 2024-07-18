import React, {useState} from 'react';
import styles from './Chatbox.module.css'; 
import Monitor from '../MonitorLogo/MonitorLogo';
import PaperClip from '../PaperClip/PaperClip';
import ChatInput from '../ChatInput/ChatInput';
import SubmitButton from '../SubmitButton/SubmitButton';
import ChatService from '../../services/ChatService'; // Update the path to the ChatService module

type ChatboxProps = {
  chatHistory: { role: string; content: string; }[];
  setChatHistory: React.Dispatch<React.SetStateAction<{ role: string; content: string; }[]>>;
  onMessageSend: () => void;
  messageSent: boolean;
};

const Chatbox: React.FC<ChatboxProps> = ({ chatHistory, setChatHistory, onMessageSend, messageSent }) => {
    const [message, setMessage] = useState('');
    const model = "TheBloke/stablelm-zephyr-3b-GGUF"; // Define your model
    const temperature = 0.7; // Define the temperature

    const handleSendMessage = async () => {
      const newMessage = { role: 'user', content: message };
      // Directly update chat history with the new user message
      setChatHistory(prevHistory => [...prevHistory, newMessage]);
      onMessageSend(); // Indicate that a message has been sent
    
      try {
        const requestBody = {
          model: model,
          messages: [...chatHistory, newMessage], // Use the latest chat history including the new message
          temperature: temperature
        };
    
        // Send the request
        const response = await ChatService.createChatCompletion(requestBody);
    
        // Add the server's response to the chat history
        setChatHistory(prevChatHistory => [...prevChatHistory, { content: response.data.text, role: 'Belto' }]);
      } catch (error) {
        console.error('Error sending message:', error);
        setChatHistory(prevChatHistory => [...prevChatHistory, { content: 'Failed to get response.', role: 'Belto' }]);
      }
    
      // Clear the input field
      setMessage('');
    };

    return (
      <div className= {`${styles.Chatbox} ${messageSent ? styles.ChatboxBottom : ''}`}>
        <Monitor/>
        <PaperClip/>
        <ChatInput message={message} setMessage={setMessage} handleSendMessage={handleSendMessage} />
        <SubmitButton handleSendMessage={handleSendMessage} />
      </div>
    );
};

export default Chatbox; 