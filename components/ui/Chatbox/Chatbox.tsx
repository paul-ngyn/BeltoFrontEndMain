import React, {useState} from 'react';
import styles from './Chatbox.module.css'; 
import Monitor from '../MonitorLogo/MonitorLogo';
import PaperClip from '../PaperClip/PaperClip';
import ChatInput from '../ChatInput/ChatInput';
import SubmitButton from '../SubmitButton/SubmitButton';
import ResponseSection from '../ResponseSection/ResponseSection';

type ChatboxProps = {
    chatHistory: { text: string; sender: string; }[];
    setChatHistory: React.Dispatch<React.SetStateAction<{ text: string; sender: string; }[]>>;
    onMessageSend: () => void; // Add this line
    messageSent: boolean; // Add this line
};

const Chatbox: React.FC<ChatboxProps> = ({ chatHistory, setChatHistory, onMessageSend, messageSent }) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
      // Add the message to the chat history
      setChatHistory([...chatHistory, { text: message, sender: 'user' }]);
      onMessageSend(); // Call onMessageSend when a message is sent

      // Generate a response
      const response = 'This is a response to your message.';
      setChatHistory(prevChatHistory => [...prevChatHistory, { text: response, sender: 'bot' }]);

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