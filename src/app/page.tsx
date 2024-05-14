"use client"
import React, { useState } from 'react';
import Head from 'next/head';
import './globals.css';
import './page.module.css'
import ToolDropdown from '../../components/ui/ToolDropdown/ToolDropdown';
import Chatbox from '../../components/ui/Chatbox/Chatbox';
import NavigationBar from '../../components/ui/NavBar/NavBar';
import Sidebar from '../../components/ui/SideBar/SideBar';
import ResponseSection from '../../components/ui/ResponseSection/ResponseSection';
import ResponseLogo from '../../components/ui/ResponseLogo/ResponseLogo';

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
          <ResponseSection chatHistory={chatHistory}/>
          <Chatbox chatHistory={chatHistory} setChatHistory={setChatHistory} onMessageSend={() => setMessageSent(true)} messageSent = {messageSent}/>
        </div>
      </div>
    </>
  );
};

export default Home;