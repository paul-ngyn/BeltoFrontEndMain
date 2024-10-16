"use client"
import React, { useState, useEffect } from 'react';
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
  const [chatHistories, setChatHistories] = useState<{ id: string; history: { text: string; sender: string; }[] }[]>([]);
  const [selectedChatHistory, setSelectedChatHistory] = useState<{ id: string; history: { text: string; sender: string; }[] } | null>(null);
  const [messageSent, setMessageSent] = useState(false); // New state variable

  useEffect(() => {
    // Fetch chat histories from the backend when the component mounts
    const fetchChatHistories = async () => {
      try {
        const response = await fetch('http://localhost:3000/chat-histories'); // Adjust the URL as needed
        const data = await response.json();
        console.log('Fetched chat histories:', data); // Log the response data
        setChatHistories(data);
        if (data.length > 0) {
          setSelectedChatHistory(data[0]); // Select the first chat history by default
        }
      } catch (error) {
        console.error('Error fetching chat histories:', error);
      }
    };

    fetchChatHistories();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setSidebarOpen(!sidebarOpen);
  };

  const handleChatHistoryChange = (newChatHistory: { text: string; sender: string; }[] | ((prevState: { text: string; sender: string; }[]) => { text: string; sender: string; }[])) => {
    if (selectedChatHistory) {
      setSelectedChatHistory(prevState => {
        if (!prevState) return null;
        return {
          ...prevState,
          history: typeof newChatHistory === 'function' ? newChatHistory(prevState.history) : newChatHistory
        };
      });
      setChatHistories(prevHistories => prevHistories.map(history => 
        history.id === selectedChatHistory.id ? { ...history, history: typeof newChatHistory === 'function' ? newChatHistory(history.history) : newChatHistory } : history
      ));
      setMessageSent(true); // Update messageSent when a message is sent
    } else {
      const newHistory = { id: `chat-${Date.now()}`, history: typeof newChatHistory === 'function' ? newChatHistory([]) : newChatHistory };
      setChatHistories([...chatHistories, newHistory]);
      setSelectedChatHistory(newHistory);
      setMessageSent(true);
    }
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

  const handleSelectChatHistory = (id: string) => {
    const selectedHistory = chatHistories.find(history => history.id === id);
    setSelectedChatHistory(selectedHistory || null);
  };

  const handleCreateNewChatHistory = () => {
    const newHistory = { id: `chat-${Date.now()}`, history: [] };
    setChatHistories([...chatHistories, newHistory]);
    setSelectedChatHistory(newHistory);
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
        <Sidebar
          isOpen={isOpen}
          toggle={toggleSidebar}
          chatHistories={chatHistories}
          selectedChatHistoryId={selectedChatHistory ? selectedChatHistory.id : null}
          onSelectChatHistory={handleSelectChatHistory}
          onCreateNewChatHistory={handleCreateNewChatHistory}
        />
        <div className={isOpen ? 'contentOpen' : 'content'}>
          {messageSent && <ResponseLogo/>}
          {!messageSent && <ToolDropdown/>} {/* Conditionally render ToolDropdown */}
          {selectedChatHistory && (
            <ResponseSection chatHistory={selectedChatHistory.history}
              onReact={onReact}  
              onStop={onStop}    
            />
          )}
          <Chatbox 
            chatHistory={selectedChatHistory ? selectedChatHistory.history : []} 
            setChatHistory={handleChatHistoryChange} 
            onMessageSend={() => {
              if (!selectedChatHistory) {
                const newHistory = { id: `chat-${Date.now()}`, history: [] };
                setChatHistories([...chatHistories, newHistory]);
                setSelectedChatHistory(newHistory);
              }
              setMessageSent(true);
            }} 
            messageSent={messageSent}
          />
        </div>
      </div>
    </>
  );
};

export default Home;