import React, { useState } from 'react';
import { toast } from 'react-toastify';
import validator from 'email-validator';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;
    if (!nome || !email || !password || !password2) {
      formErrors = true;
      toast.error('Todos os campos precisam ser preenchidos!');
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
