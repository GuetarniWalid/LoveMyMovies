import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkLogin, selectStatus } from './LoginSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import ErrorLoginCard from '../../components/ErrorLoginCard/ErrorLoginCard';
import GuestLoginCard from '../../components/GuestLoginCard/GuestLoginCard';
import { useHistory } from 'react-router-dom';
import './LoginForm.css'

export default function LoginForm() {
  const [errorUser, setErrorUser] = useState(false);
  const [classButton, setclassButton] = useState('btn btn-primary btn-block');
  const loginRef = useRef(null)
  const passwordRef = useRef(null)
  
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const history = useHistory()

  function setToggleTime() {
    setTimeout(() => {
      setErrorUser(false)
    }, 3000);
  }

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
      if(status === 'fulfilled') history.push('/accueil')
    }
    redirectToAccueil()
  }, [status, history])

  

  const button =
    status === 'pending' ? (
      <button className='btn btn-primary btn-block' type='submit' disabled>
        Valider
      </button>
    ) : (
      <button className={classButton} type='submit'>
        Valider
      </button>
    );
  return (
    <div className='position-relative'>
      <div className='row'>
        <form onSubmit={handleSubmit} className='col-4 mx-auto'>
          <input placeholder='identifiant...' className='form-control mb-2' type='text' ref={loginRef} />
          <input placeholder='mot de passe...' className='form-control mb-2' type='password' ref={passwordRef} />
          {button}
        </form>
      </div>
      <GuestLoginCard 
      loginRef={loginRef} 
      passwordRef={passwordRef} 
      setclassButton={setclassButton}/>
      <ErrorLoginCard 
        errorUser={errorUser}
        setToggleTime={setToggleTime}
      />
    </div>
  );
}
