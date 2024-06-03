import React, {useState} from 'react';
import styles from './Chatbox.module.css'; 
import Monitor from '../MonitorLogo/MonitorLogo';
import PaperClip from '../PaperClip/PaperClip';
import ChatInput from '../ChatInput/ChatInput';
import SubmitButton from '../SubmitButton/SubmitButton';
import ChatService from '../../services/ChatService';
//import ResponseSection from '../ResponseSection/ResponseSection';

type ChatboxProps = {
  chatHistory: { text: string; sender: string; }[];
  setChatHistory: React.Dispatch<React.SetStateAction<{ text: string; sender: string; }[]>>;
  onMessageSend: () => void; // Add this line
  messageSent: boolean; // Add this line
};

const Chatbox: React.FC<ChatboxProps> = ({ chatHistory, setChatHistory, onMessageSend, messageSent }) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = async () => {
      // Add the message to the chat history
      setChatHistory([...chatHistory, { text: message, sender: 'user' }]);
    
      try {
        // Send the message to the server and get a response
        const response = await ChatService.createChatCompletion({ text: message, sender: 'user' });
    
        // Add the server's response to the chat history
        setChatHistory(prevChatHistory => [...prevChatHistory, { text: response.data.text, sender: 'server' }]);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    
      onMessageSend(); // Call onMessageSend when a message is sent
    
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

    /** 
      // Add the message to the chat history
      setChatHistory([...chatHistory, { text: message, sender: 'user' }]);
      onMessageSend(); // Call onMessageSend when a message is sent

      // Generate a response
      const response = 'This is a response to your message.';
      setChatHistory(prevChatHistory => [...prevChatHistory, { text: response, sender: 'Belto' }]);
      
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
}; */

export default Chatbox; 