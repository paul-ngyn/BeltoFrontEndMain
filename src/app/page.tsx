import React from 'react';
import Head from 'next/head';
import './globals.css';
import ToolDropdown from '../../components/ui/ToolDropdown/ToolDropdown';
import Chatbox from '../../components/ui/Chatbox/Chatbox';
import Burger from '../../components/ui/Burger/Burger';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <div className="ai-interface-first-look">

        <header className="navigation-bar" id="navigationBar">
        <Burger/>
        </header>
        <ToolDropdown/>
        <Chatbox/>
      </div>
    </>
  );
};

export default Home;
