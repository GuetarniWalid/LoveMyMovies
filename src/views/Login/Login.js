import React, { Fragment } from 'react';
import LoginForm from './LoginForm/LoginForm';
import Title from '../../components/Title';

export default function Login() {
  return (
    <Fragment>
      <Title />
      <LoginForm />
    </Fragment>
  );
}
