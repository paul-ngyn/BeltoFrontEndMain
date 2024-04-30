import React from 'react';
import styles from './Chatbox.module.css'; 
import Monitor from '../MonitorLogo/MonitorLogo';
import PaperClip from '../PaperClip/PaperClip';
import ChatInput from '../ChatInput/ChatInput';
import SubmitButton from '../SubmitButton/SubmitButton';

const Chatbox: React.FC = () => {
    return (
      <div className={styles.Chatbox}>
        <Monitor/>
        <PaperClip/>
        <ChatInput/>
        <SubmitButton/>
      </div>
    );
  };
  
  export default Chatbox;