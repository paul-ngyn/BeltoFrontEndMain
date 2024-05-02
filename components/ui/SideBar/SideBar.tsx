import React from 'react';
import styles from './SideBar.module.css';
import Image from 'next/image';

const Sidebar: React.FC<{ isOpen: boolean; toggle: () => void }> = ({ isOpen, toggle }) => {
  return (
    
    <div className={isOpen ? styles.sidebarOpen : styles.sidebar}>
      <button className= {styles.closeButton} onClick={toggle}> <img src = '/assets/hotdog plus.png' alt="Close"/> </button>
      <ul>
        <li><a href="#option1">Option 1</a></li>
        <li><a href="#option2">Option 2</a></li>
        <li><a href="#option3">Option 3</a></li>
        <li><a href="#option3">Option 4</a></li>
      </ul>
      <Image className= {styles.Line} alt = '' src = '/assets/line-10@2x.png' width = {230} height = {2}/>
    </div>
  );
};

export default Sidebar;