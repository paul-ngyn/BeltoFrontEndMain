import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ToolDropdown.module.css'; 
import Logo from '../Logo/Logo';
import TextLogo from '../TextLogo/TextLogo';
import Dropdown from '../Dropdown/Dropdown.client';

const ToolDropdown: React.FC = () => {
    return (
      <div className={styles.ToolDropdown}>
        <Logo/>
        <TextLogo/>
        <Dropdown/>
      </div>
    );
  };
  
  export default ToolDropdown;