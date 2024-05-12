"use client"
import React, { useState } from 'react';
import Burger from '../Burger/Burger';
import styles from './NavBar.module.css';
import NavTextLogo from '../NavTextLogo/NavTextLogo';
import NavDropDown from '../NavDropDown/NavDropDown.client';

interface NavigationBarProps {
  title?: string;
  toggleSidebar: () => void;
  messageSent: boolean; // Add this prop
}

const NavigationBar: React.FC<NavigationBarProps> = ({ title, toggleSidebar, messageSent }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className={styles.navigationBar} id="navigationBar">
      {title && <h1>{title}</h1>}
      <div className = {styles.navItems}>
      <Burger onClick={toggleSidebar} />
      {messageSent && (
        <>
          <NavTextLogo className = {styles.NavTextLogo} /> 
          <NavDropDown className = {styles.NavDropDown} /> 
        </>
      )}
      </div>
    </header>
  );
};


export default NavigationBar;