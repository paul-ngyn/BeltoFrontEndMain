import React from 'react';
import Head from 'next/head';
import './globals.css';
import ToolDropdown from '../../components/ui/ToolDropdown/ToolDropdown';
import Chatbox from '../../components/ui/Chatbox/Chatbox';
import Burger from '../../components/ui/Burger/Burger';
import NavigationBar from '../../components/ui/NavBar/NavBar';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <div className="ai-interface-first-look">

        <NavigationBar/>
        <ToolDropdown/>
        <Chatbox/>
      </div>
    </>
  );
};

export default Home;
