import React, { useState } from 'react';
import Image from 'next/image';
import styles from './MonitorLogo.module.css';

// Define the component as a functional component
const Monitor: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className={styles.Monitor}>
      <button className={styles.monitorarrowup} onClick={togglePopup}>
        <Image alt="Monitor" src="/assets/arrow.svg" width={24} height={24} />
      </button>
      {isPopupVisible && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <ul className={styles.linkList}>
              <li><a href="#link1" className={styles.link}>Link 1</a></li>
              <li><a href="#link2" className={styles.link}>Link 2</a></li>
              <li><a href="#link3" className={styles.link}>Link 3</a></li>
            </ul>
            <button className={styles.closeButton} onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Monitor;