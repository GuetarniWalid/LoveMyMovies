import React from 'react';
import styles from './BottomNavbar.module.css';

export default function BottomNavbar() {
  return (
    <nav className={styles.nav}>
      <ul>
          <li><span>MES FAVORIS</span><span>12</span></li>
          <li><span>A VOIR</span><span>7</span></li>
          <li><span>NOUVEAUTES</span><span>32</span></li>
      </ul>
    </nav>
  );
}
