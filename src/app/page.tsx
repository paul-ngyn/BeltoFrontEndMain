import React from 'react';
import Head from 'next/head';
import './globals.css';
import styles from './page.module.css';
import ToolDropdown from '../../components/ui/ToolDropdown/ToolDropdown';

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

        <div className="chatbox">
          <button className="monitorarrowup">
            <img className="monitor" alt="" src="/assets/arrow.svg" />
          </button>
          <button className="paperclip">
            <img className="paperclip1" alt="" src="/assets/prompt-chat-field--alternativepapercliphorizontal@2x.png" />
          </button>
          <input
            className="type-your-prompt"
            placeholder="Type your prompt here"
            type="text"
          />
          <button className="arrow">
            <img className="arrowdown-icon" alt="" src="/assets/arrowdown.svg" />
          </button>
        </div>

      </div>
    </>
  );
};

export default Home;
