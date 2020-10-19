import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkLogin, selectStatus } from '../../../features/LoginSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import ErrorLoginCard from '../ErrorLoginCard/ErrorLoginCard';
import GuestLoginCard from '../GuestLoginCard/GuestLoginCard';
import { useHistory } from 'react-router-dom';
import { Input } from '../Input/Input'
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const [errorUser, setErrorUser] = useState(false);
  const loginRef = useRef(null);
  const passwordRef = useRef(null);
  const buttondRef = useRef(null);

  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const resultCheckLogin = await dispatch(checkLogin({ username: e.target[0].value, password: e.target[1].value }));
      unwrapResult(resultCheckLogin);
    } catch (err) {
      setErrorUser(true);
    }
  }

  useEffect(() => {
    function redirectToAccueil() {
      if (status === 'fulfilled') history.push('/accueil');
    }
    redirectToAccueil();
  }, [status, history]);

  const button =
    status === 'pending' ? (
      <button className={styles.buttonPending} type='submit' disabled>
        Valider
      </button>
    ) : (
      <button ref={buttondRef} className={styles.button} type='submit'>
        Valider
      </button>
    );
  return (
    <div className={styles.wrapper}>
      <div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input ref={loginRef} id='login' type='text' >identifiant</Input>
          <Input ref={passwordRef} id='password' type='password' >mot de passe</Input>
          {button}
        </form>
      </div>
      <GuestLoginCard loginRef={loginRef} passwordRef={passwordRef} buttondRef={buttondRef}/>
      <ErrorLoginCard errorUser={errorUser} setErrorUser={setErrorUser}/>
    </div>
  );
}
