import React from 'react';
import Image from 'next/image';
import styles from './ResponseLogo.module.css'; // Assuming you have specific styles for the logo

const ResponseLogo: React.FC = () => {
  return (
    <div className={styles.beltologo}>
          <Image src="/assets/beltologo.png" alt="BeltoLogo" width={250} height={250} />
    </div>
  );
};

export default ResponseLogo;