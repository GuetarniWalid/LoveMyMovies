import React, { forwardRef, useRef } from 'react';
import styles from './Input.module.css';
import gsap from 'gsap';

export const Input = forwardRef(({ children, id, type }, ref) => {
  const label = useRef(null);

  function handleFocus() {
    if (!ref.current.value) {
    gsap.timeline()
      .to(ref.current.parentNode.firstChild, {
        duration: 0.3,
        y: -20,
        scale: 0.85,
        color: 'rgb(252, 96, 69)',
      })
      .to(
        ref.current.nextSibling,
        {
          duration: 0.3,
          scaleX: 0.05,
          transformOrigin: '0% 0%',
        },
        0
      )
      .to(ref.current.nextSibling, {
        duration: 0.3,
        scaleX: 1,
        transformOrigin: '0% 0%',
        background: 'rgb(252, 96, 69)',
      });
    }
  }

  function handleBlur() {
    if (!ref.current.value) {
      gsap
        .timeline()
        .to(ref.current.parentNode.firstChild, {
          duration: 0.3,
          y: 0,
          scale: 1,
          color: 'rgba(255, 255, 255, 0.7)',
        })
        .to(
          ref.current.nextSibling,
          {
            duration: 0.3,
            background: '#ffffff',
          },
          0
        );
    }
  }

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>
        {children}
      </label>
      <input id={id} className={styles.input} type={type} ref={ref} onFocus={handleFocus} onBlur={handleBlur} />
      <span className={styles.hr}/>
    </div>
  );
});
