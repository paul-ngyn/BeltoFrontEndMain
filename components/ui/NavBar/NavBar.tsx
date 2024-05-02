"use client"
import React from 'react';
import Burger from '../Burger/Burger';
import styles from './NavBar.module.css';

interface NavigationBarProps {
  title?: string;
  toggleSidebar: () => void; // Add this prop
}

const NavigationBar: React.FC<NavigationBarProps> = ({ title, toggleSidebar }) => {
  return (
    <header className={styles.navigationBar} id="navigationBar">
      {title && <h1>{title}</h1>}
      <Burger onClick={toggleSidebar} />
    </header>
  );
};

export default NavigationBar;