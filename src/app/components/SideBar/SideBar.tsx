import React, { useState } from 'react';
import styles from './SideBar.module.css';
import Image from 'next/image';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
  chatHistories: { id: string; history: { text: string; sender: string; }[] }[];
  selectedChatHistoryId: string | null;
  onSelectChatHistory: (id: string) => void;
  onCreateNewChatHistory: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle, chatHistories, selectedChatHistoryId, onSelectChatHistory, onCreateNewChatHistory }) => {
  const [options, setOptions] = useState(['Environmental DB']);
  const [editingOption, setEditingOption] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const addOption = () => {
    const newOption = `Click to Edit DB name`;
    setOptions(prevOptions => [...prevOptions, newOption]);
    setEditingOption(newOption);
    setInputValue(newOption);
  };

  const renameOption = (oldOption: string, newOption: string) => {
    setOptions(options.map(option => option === oldOption ? newOption : option));
    setEditingOption(null);
  };

  return (
    <div>
      {isOpen && (
        <button className={styles.closeButton} onClick={toggle}>
          <Image src="/assets/CloseButton.svg" alt="Close" width={10} height={35} />
        </button>
      )}
      <div className={isOpen ? styles.sidebarOpen : styles.sidebar}>
        <ul>
          {chatHistories.map((chatHistory, index) => (
            <li key={chatHistory.id}>
              <div className={styles.optionContainer}>
                <a
                  href={`#${chatHistory.id}`}
                  onClick={() => onSelectChatHistory(chatHistory.id)}
                  className={selectedChatHistoryId === chatHistory.id ? styles.selected : ''}
                >
                  <span className={styles.firstLetter}>{chatHistory.id[0]}</span>
                  <span className={styles.restOfString}>{chatHistory.id.slice(1)}</span>
                </a>
              </div>
            </li>
          ))}
          <li>
            <div className={styles.addButtonContainer}>
              <button className={styles.addButton} onClick={onCreateNewChatHistory}>
                <Image className={styles.Plus} alt="" src="/assets/Plus.svg" width={24} height={24} />
              </button>
            </div>
          </li>
        </ul>
        <div className={styles.lowerContent}>
          <Image className={styles.Line} alt="" src="/assets/line-10@2x.png" width={240} height={2} />
        </div>
        <div>
          <div className={styles.dashboardContainer}>
            <span className={styles.dashboardText}> My Dashboard </span>
            <Image className={styles.desktop} src="/assets/desktop@2x.png" alt="" width={25} height={25} />
          </div>
          <div className={styles.usernameContainer}>
            <span className={styles.usernameText}> Username Here </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;