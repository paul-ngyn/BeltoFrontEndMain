import React from 'react';
import Head from 'next/head';
import './globals.css';
import styles from './page.module.css';
import ToolDropdown from '../../components/ui/ToolDropdown/ToolDropdown';
import Monitor from '../../components/ui/MonitorLogo/MonitorLogo';
import PaperClip from '../../components/ui/PaperClip/PaperClip';

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
          <Monitor/>
          <PaperClip/>
          <input
            className="type-your-prompt"
            placeholder="Type your prompt here"
            type="text"
          />
          <button className="Submit">
            <img className="Submit-Button" alt="" src="/assets/SubmitButton.svg" />
          </button>
        </div>

      </div>
    </>
  );
};

export default Home;
