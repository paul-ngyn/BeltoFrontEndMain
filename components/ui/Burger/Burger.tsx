import React from 'react';
import styles from './Burger.module.css'
import Image from 'next/image';


// Define the component as a functional component
interface BurgerProps {
  onClick: () => void;
}
const Burger: React.FC<BurgerProps> = ({onClick}) => {
  return (
    <button className= {styles.BurgerButton} onClick={onClick}>
      <Image className="Burger" alt="" src="/assets/burger.svg" width = {36} height = {36} />
      </button>
  );
};

export default Burger;