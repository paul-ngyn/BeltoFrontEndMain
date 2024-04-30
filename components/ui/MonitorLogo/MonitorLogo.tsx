import React from 'react';
import Image from 'next/image';
import styles from './MonitorLogo.module.css'


// Define the component as a functional component
const Monitor: React.FC = () => {
  return (
    <button className= {styles.monitorarrowup}>
      <Image className="Monitor" alt="" src="/assets/arrow.svg" width = {19} height = {20} />
    </button>
  );
};

export default Monitor;