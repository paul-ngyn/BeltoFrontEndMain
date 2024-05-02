"use client"
import React, { useState } from 'react';
import Head from 'next/head';
import './globals.css';
import './page.module.css'
import ToolDropdown from '../../components/ui/ToolDropdown/ToolDropdown';
import Chatbox from '../../components/ui/Chatbox/Chatbox';
import Burger from '../../components/ui/Burger/Burger';
import NavigationBar from '../../components/ui/NavBar/NavBar';
import Sidebar from '../../components/ui/SideBar/SideBar';


const Home: React.FC = () => {
const [isOpen, setIsOpen] = useState(false);
const toggleSidebar = () => { setIsOpen(!isOpen);
  };
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <div className="ai-interface-first-look">
        <NavigationBar toggleSidebar={toggleSidebar}/>
        <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
        <div className={isOpen ? 'contentOpen' : 'content'}>
          <ToolDropdown/>
          <Chatbox/>
        </div>
      </div>
    </>
  );
};
export default Home;
