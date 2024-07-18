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
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string; }[]>([]);
  const [messageSent, setMessageSent] = useState(false); // New state variable

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setSidebarOpen(!sidebarOpen);
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