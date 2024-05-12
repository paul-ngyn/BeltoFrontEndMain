import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './NavTextLogo.module.css'; // Assuming you have specific styles for the logo

interface NavTextLogoProps {
    className?: string;
  }
  
  const NavTextLogo: React.FC<NavTextLogoProps> = ({ className }) => {
    return (
      <div className={`${styles.belto} ${className}`}>
          <Image src="/assets/belto.svg" alt="Beltotext" width={80} height={40} />
    </div>
  );
};

export default NavTextLogo;