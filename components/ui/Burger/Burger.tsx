import React from 'react';
import styles from './Burger.module.css'
import Image from 'next/image';

// Define the component as a functional component
const Burger: React.FC = () => {
  return (
    <button className= {styles.BurgerButton}>
      <Image className="Burger" alt="" src="/assets/burger.svg" width = {32} height = {32} />
      </button>
  );
};

export default Burger;