import React, { useState } from 'react';
import { toast } from 'react-toastify';
import validator from 'email-validator';
import { get } from 'lodash';
import history from '../../services/history';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import axios from '../../services/axios';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;
    if (!nome) {
      formErrors = true;
      toast.error('Nome Invalido!');
    }
    if (!validator.validate(email)) {
      formErrors = true;
      toast.error('Email Invalido!');
    }
    if (password.length < 6) {
      formErrors = true;
      toast.error('Senha deve conter mais de 6 digitos!');
    }
    if (password2 && password !== password2) {
      formErrors = true;
      toast.error('Senhas Precisam ser Iguais!');
    }

    if (formErrors) return;

    try {
      await axios.post('/users/', {
        nome,
        password,
        email,
      });

      toast.success('Registrado com sucesso');
      history.push('/login');
    } catch (err) {
      const errors = get(e, 'response.data.errors');
      // eslint-disable-next-line no-console
      errors.map(error => toast.error(error));
    }
  }

  return (
    <Container>
      <h1>Crie Sua Conta</h1>
      <Form onSubmit={e => handleSubmit(e)}>
        <label htmlFor="nome">
          Nome
          <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Digite seu Nome" />
        </label>

        <label htmlFor="email">
          Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite seu Email" />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Digite sua Senha"
          />
        </label>

        <label htmlFor="password2">
          Confirmar Senha
          <input
            type="password"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
            placeholder="Digite sua Senha Novamente"
          />
        </label>

        <button type="submit">Criar minha conta</button>
      </Form>
    </Container>
  );
}