import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';

export default function Login(props) {
  const dispatch = useDispatch();
  const prevPath = get(props, 'location.state.prevPath', '/');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (!email || !password || password.length < 6 || !isEmail(email)) {
      toast.error('Usuario ou senha invalido!');
      formErrors = true;
    }
    if (formErrors) return;

    dispatch(actions.loginRequest({ email, password, prevPath }));
  }

  return (
    <Container>
      <h1>Login</h1>

      <Form onSubmit={e => handleSubmit(e)}>
        <label htmlFor="email">
          Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite seu email" />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
        </label>
        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}
