 import React, { useEffect, useRef, useState } from 'react';
import styles from './GuestLoginCard.module.css';
import gsap from 'gsap';

export default function GuestLoginCard({ loginRef, passwordRef, buttondRef }) {
  const [text, setText] = useState("Cliquer ici pour tester l'application en mode invité");
  const ref = useRef(null);

  useEffect(() => {
    gsap.from(ref.current, {
      duration: 1,
      delay: 3,
      x: '200px',
      opacity: 0,
    });
  }, []);

  function fillForm() {
    loginRef.current.focus();
    loginRef.current.value = 'invité';
    passwordRef.current.focus();
    passwordRef.current.value = 'azerty';
    setText(`Vous pouvez valider`);

    gsap.fromTo(buttondRef.current, {
      boxShadow: '0 0 0 0 rgba(180, 63, 42, 1)'
    }, {
      duration: 1,
      delay: 1,
      boxShadow: '0 0 0 14px rgba(180, 63, 42, 0.01)',
      repeat: -1
    });
  }

  return (
    <div ref={ref} className={styles.div}>
      <p className={styles.p}>Pour utiliser cette application, il faut avoir un compte chez "The Movie Database"</p>
      <button onClick={fillForm} className={styles.button}>
        Compte invité
      </button>
      <p className={styles.p}>{text}</p>
    </div>
  );
}
