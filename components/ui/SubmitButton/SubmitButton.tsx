import React from 'react';
import styles from './SubmitButton.module.css'
import Image from 'next/image';

// Define the component as a functional component
const SubmitButton: React.FC = () => {
  return (
    <button className= {styles.Submitbutton}>
      <Image className="Submit" alt="" src="/assets/SubmitButton.svg" width = {24} height = {24} />
      </button>
  );
};

export default SubmitButton;