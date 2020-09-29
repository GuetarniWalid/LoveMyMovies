import React from 'react';
import styles from './Title.module.css';

export default function Title() {
  return (
    <h1 className={styles.title}>
      L
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 22' stroke='currentColor' width='60'>
        <path
          className={styles.heart}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='3'
          d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
        />
      </svg>
      VE MY MOVIES
    </h1>
  );
}
