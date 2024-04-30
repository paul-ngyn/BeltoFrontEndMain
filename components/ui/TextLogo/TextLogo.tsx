import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './TextLogo.module.css'; // Assuming you have specific styles for the logo

const TextLogo: React.FC = () => {
  return (
    <div className={styles.belto}>
          <Image src="/assets/belto.svg" alt="Beltotext" width={129} height={129} />
    </div>
  );
};

export default TextLogo;