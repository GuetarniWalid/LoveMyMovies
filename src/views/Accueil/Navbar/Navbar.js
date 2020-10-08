import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.wrapper}>
      <div className={styles.left}>
        <h1 className={styles.h1}>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 22' stroke='currentColor' width='40'>
            <path
              className={styles.heart}
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
            />
          </svg>
        </h1>
        <label htmlFor='search' className={styles.label}>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' width='18'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
          </svg>
        </label>
        <input id='search' className={styles.input} type='text' placeholder='RECHERCHER' />
      </div>
      <div className={styles.middle}>
        <Link to='/Accueil' className={styles.a}>ACCUEIL</Link>
        <Link to='/Series' className={styles.a}>SERIES</Link>
        <Link to='/Films' className={styles.a}>FILMS</Link>
      </div>
      <div className={styles.right}>
        <button className={styles.button}>PROFILE</button>
        <img src='https://source.unsplash.com/user/erondu/45x45' alt='profil' />
      </div>
    </nav>
  );
}
