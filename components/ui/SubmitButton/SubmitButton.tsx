import React from 'react';
import styles from './SubmitButton.module.css'
import Image from 'next/image';

// Define the component as a functional component
const SubmitButton: React.FC = () => {
  return (
    <button type = "submit" className= {styles.Submitbutton}>
      <Image className= {styles.Submit} alt="" src="/assets/SubmitButton.svg" width = {21} height = {21} />
      </button>
  );
};

export default SubmitButton;