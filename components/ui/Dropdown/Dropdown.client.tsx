"use client";
import React, { useState } from 'react';
import styles from './Dropdown.module.css'; // Assuming you are using CSS modules for styling

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className={styles.dropdown}>
      <button onClick={toggleDropdown} className={styles.button}>
       <span>ESG</span> 
       <svg className = {styles.caret} width="12" height="12" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M207.029 381.476l-184-184c-9.373-9.373-9.373-24.569 0-33.941s24.569-9.373 33.941 0L224 313.564l167.029-167.029c9.372-9.373 24.568-9.373 33.941 0s9.373 24.569 0 33.941l-184 184c-9.372 9.372-24.568 9.372-33.94 0z"/>
      </svg>
      </button>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          <li className={styles.dropdownItem} onClick={() => console.log('Option 1 selected')}>Option 1</li>
          <li className={styles.dropdownItem} onClick={() => console.log('Option 2 selected')}>Option 2</li>
          <li className={styles.dropdownItem} onClick={() => console.log('Option 3 selected')}>Option 3</li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;