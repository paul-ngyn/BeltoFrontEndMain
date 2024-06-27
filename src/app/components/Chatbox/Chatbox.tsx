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
  onMessageSend: () => void;
  messageSent: boolean;
};

const Chatbox: React.FC<ChatboxProps> = ({ chatHistory, setChatHistory, onMessageSend, messageSent }) => {
    const [message, setMessage] = useState('');
    const model = "TheBloke/stablelm-zephyr-3b-GGUF"; // Define your model
    const temperature = 0.7; // Define the temperature

    const handleSendMessage = async () => {
      const newMessage = { text: message, sender: 'user' };
      const updatedHistory = [...chatHistory, newMessage];

      // Update chat history with user message
      setChatHistory(updatedHistory);
      onMessageSend(); // Call onMessageSend when a message is sent

      try {
        // Send the user input to the server and get a response
        const response = await ChatService.createChatCompletion({
          text: message,
          sender: 'user',
          model: model,
          temperature: temperature,
          messages: updatedHistory // Send the current chat history as part of the messages
        });
    
        // Add the server's response to the chat history
        setChatHistory(prevChatHistory => [...prevChatHistory, { text: response.data.text, sender: 'server' }]);
      } catch (error) {
        console.error('Error sending message:', error);
        // Optionally handle error by showing in the chat
        setChatHistory(prevChatHistory => [...prevChatHistory, { text: 'Failed to get response.', sender: 'server' }]);
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