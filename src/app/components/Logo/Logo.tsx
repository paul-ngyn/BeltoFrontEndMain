import React from 'react';
import Image from 'next/image';
import styles from './Logo.module.css'; // Assuming you have specific styles for the logo

const Logo: React.FC = () => {
  return (
    <div className={styles.beltologo}>
          <Image src="/assets/beltologo.png" alt="BeltoLogo" width={165} height={165} />
    </div>
  );
};

export default Logo;