import React, { useEffect, useRef } from 'react';
import styles from './ErrorLoginCard.module.css';
import gsap from 'gsap';

export default function ErrorLoginCard({ errorUser, setErrorUser }) {
  const ref = useRef(null);

  useEffect(() => {
    const displayCard = () => {
      if (errorUser) {
        gsap.timeline({ yoyo: true, repeat: 1, repeatDelay: 3 }).to(ref.current, {
          duration: 0.3,
          opacity: 1,
          y: 0,
          transformOrigin: '0% 100%',
          onReverseComplete: () => setErrorUser(false)
        });
      }
    };
    displayCard();
  }, [errorUser, setErrorUser]);


  return (
    errorUser && (
      <div ref={ref} className={styles.div}>
        <p className={styles.p}>Identifiant ou mot de passe incorrect.</p>
      </div>
    )
  );
}
