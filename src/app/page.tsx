"use client"
import React, { useState } from 'react';
import Head from 'next/head';
import './globals.css';
import './page.module.css'
import ToolDropdown from './components/ToolDropdown/ToolDropdown';
import Chatbox from './components/Chatbox/Chatbox';
import NavigationBar from './components/NavBar/NavBar';
import Sidebar from './components/SideBar/SideBar';
import ResponseSection from './components/ResponseSection/ResponseSection';
import ResponseLogo from './components/ResponseLogo/ResponseLogo'; // Check if the file path is correct and if the required module exists in the specified location

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Declare sidebarOpen state variable
  const [chatHistory, setChatHistory] = useState<{ text: string; sender: string; }[]>([]);
  const [messageSent, setMessageSent] = useState(false); // New state variable

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setSidebarOpen(!sidebarOpen);
  };

  const handleChatHistoryChange = (newChatHistory: { text: string; sender: string; }[]) => {
    setChatHistory(newChatHistory);
    setMessageSent(true); // Update messageSent when a message is sent
  };

  const onReact = (index: number, reaction: string) => {
    console.log(`Reacted to message ${index} with ${reaction}`);
    // Add any custom logic here, such as updating the chat history
  };

  // Define the onStop function
  const onStop = () => {
    console.log('Message generation stopped');
    // Add any custom logic here to stop message generation
  };

  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <div className="ai-interface-first-look" style={{ height: '100vh', overflow: 'hidden' }}>
        <NavigationBar toggleSidebar={toggleSidebar} messageSent={messageSent} sidebarOpen={sidebarOpen}/>
        <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
        <div className={isOpen ? 'contentOpen' : 'content'}>
          {messageSent && <ResponseLogo/>}
          {!messageSent && <ToolDropdown/>} {/* Conditionally render ToolDropdown */}
          <ResponseSection chatHistory={chatHistory}
           onReact={onReact}  
           onStop={onStop}    
          />
          <Chatbox chatHistory={chatHistory} setChatHistory={setChatHistory} onMessageSend={() => setMessageSent(true)} messageSent = {messageSent}/>
        </div>
      </div>
    </>
  );
};

export default Home;