import React, { useState } from 'react';
import styles from './SideBar.module.css';
import Image from 'next/image';

const Sidebar: React.FC<{ isOpen: boolean; toggle: () => void }> = ({ isOpen, toggle }) => {
  const [options, setOptions] = useState(['Environmental DB', 'Social DB', 'Governmental DB', 'Bills DB']);

  const addOption = () => {
    const newOption = `Option ${options.length + 1}`;
    setOptions(prevOptions => [...prevOptions, newOption]);
  };

  return (
    <div>
    {isOpen && (
      <button className={styles.closeButton} onClick={toggle}>
        <Image src="/assets/CloseButton.svg" alt="Close" width={10} height={50}/>
      </button>
    )}
      <div className={isOpen ? styles.sidebarOpen : styles.sidebar}>
        <ul>
          {options.map((option, index) => (
            <li key={index}>
              <div className={styles.optionContainer}>
                <a href={`#${option.replace(' ', '')}`}>{option}</a>
              </div>
            </li>
          ))}
          <li>
            <div className={styles.addButtonContainer}>
              <button className = {styles.addButton} onClick={addOption}> <Image className= {styles.Plus} alt = "" src = "/assets/Plus.svg" width = {24} height = {24}/> </button>
            </div>
          </li>
        </ul>
        <div className={styles.lowerContent}>
          <Image className={styles.Line} alt="" src="/assets/line-10@2x.png" width={240} height={2} />
        </div>
        <div>
          <div className={styles.dashboardContainer}>My Dashboard</div>
          <div className={styles.usernameContainer}>Username Here</div>
        </div>
      </div>
    </div>
  );
};


export default Sidebar;