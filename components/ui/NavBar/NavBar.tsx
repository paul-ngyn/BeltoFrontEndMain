import React from 'react';
import Burger from '../Burger/Burger';
import styles from './NavBar.module.css'

// Optional: Define props if needed for future expansion or customization
interface NavigationBarProps {
    title?: string; // Optional prop for setting a dynamic title or other attributes
}

const NavigationBar: React.FC<NavigationBarProps> = ({ title }) => {
    return (
        <header className="navigation-bar" id="navigationBar">
            {title && <h1>{title}</h1>}
            {<Burger/>}
        </header>
    );
};

export default NavigationBar;