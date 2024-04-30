import React from 'react';
import Head from 'next/head';
import './globals.css';
import ToolDropdown from '../../components/ui/ToolDropdown/ToolDropdown';
import Monitor from '../../components/ui/MonitorLogo/MonitorLogo';
import PaperClip from '../../components/ui/PaperClip/PaperClip';
import SubmitButton from '../../components/ui/SubmitButton/SubmitButton';
import ChatInput from '../../components/ui/ChatInput/ChatInput';
import Chatbox from '../../components/ui/Chatbox/Chatbox';

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
          <button className="list" id="list">
            <img className="burger" alt="" src="/assets/burger.svg" />
          </button>
        </header>

        <ToolDropdown/>
        <Chatbox/>

      </div>
    </>
  );
};

export default Home;
