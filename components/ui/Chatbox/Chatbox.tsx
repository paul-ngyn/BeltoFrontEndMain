import React, {useState} from 'react';
import styles from './Chatbox.module.css'; 
import Monitor from '../MonitorLogo/MonitorLogo';
import PaperClip from '../PaperClip/PaperClip';
import ChatInput from '../ChatInput/ChatInput';
import SubmitButton from '../SubmitButton/SubmitButton';
import ResponseSection from '../ResponseSection/ResponseSection';

const Chatbox: React.FC = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<{ text: string; sender: string; }[]>([]);
  
    const handleSendMessage = () => {
      // Add the message to the chat history
      setChatHistory([...chatHistory, { text: message, sender: 'user' }]);
  
      // Generate a response
      const response = 'This is a response to your message.';
      setChatHistory([...chatHistory, { text: message, sender: 'user' }, { text: response, sender: 'bot' }]);
  
      // Clear the input field
      setMessage('');
    };
  
    return (
      <div className={styles.Chatbox}>
        <Monitor/>
        <PaperClip/>
        <ResponseSection chatHistory={chatHistory}/>
        <ChatInput message={message} setMessage={setMessage} />
        <SubmitButton handleSendMessage={handleSendMessage} />
      </div>
    );
  };
  
  export default Chatbox;