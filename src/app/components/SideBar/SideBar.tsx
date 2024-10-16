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
  onUpdateChatHistory: (id: string, newName: string) => void; // Add this line
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle, chatHistories, selectedChatHistoryId, onSelectChatHistory, onCreateNewChatHistory, onUpdateChatHistory }) => {
  const [editingOption, setEditingOption] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const startEditing = (id: string, currentName: string) => {
    setEditingOption(id);
    setInputValue(currentName);
  };

  const renameOption = (id: string, newName: string) => {
    onUpdateChatHistory(id, newName); // Call the update function passed from the parent
    setEditingOption(null);
    setInputValue('');
    onSelectChatHistory(newName); // Update the selected chat history
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    if (editingOption) {
      renameOption(editingOption, inputValue);
    }
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && editingOption) {
      renameOption(editingOption, inputValue);
    }
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
                {editingOption === chatHistory.id ? (
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyPress={handleInputKeyPress}
                    className={styles.inputField}
                    autoFocus
                  />
                ) : (
                  <a
                    href={`#${chatHistory.id}`}
                    onClick={() => onSelectChatHistory(chatHistory.id)}
                    className={selectedChatHistoryId === chatHistory.id ? styles.selected : ''}
                    onDoubleClick={() => startEditing(chatHistory.id, chatHistory.id)}
                  >
                    <span className={styles.firstLetter}>{chatHistory.id[0]}</span>
                    <span className={styles.restOfString}>{chatHistory.id.slice(1)}</span>
                  </a>
                )}
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