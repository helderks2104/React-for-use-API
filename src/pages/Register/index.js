import React, { useState } from 'react';
// Para usar o HTML e setar os valores dos estados
import { useSelector, useDispatch } from 'react-redux';
// Disparador de ações e useSelector para Recuperar estados ja setados armazenados
// useSelector(state => state.auth.user)
import PropTypes from 'prop-types';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';
import validar from '../../validations/validatorUsers';

// O Parametro 'props' é recebido pela propria pagina, pois o Register esta dentro de uma Route do
// React router dom
export default function Register(props) {
  // Register esta sendo convodado
  // por uma tag 'Route' do react-router-dom
  // Podemos receber 3 coisas importantes da tag Route: match, props, history entre outros
  console.log(props);

  const dispatch = useDispatch();

  // Recuperando os dados do Storage do navegador - do store do redux
  const { id, email: emailStored, nome: nomeStored } = useSelector(state => state.auth.user);
  const { history } = props;

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  // Assim que renderizar a pagina esta função sera chamada
  React.useEffect(() => {
    if (!id) return;

    setNome(nomeStored);
    setEmail(emailStored);

    // Passamos por parametro os valores de variaveis que vem de fora do state
  }, [nomeStored, emailStored]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (validar({ nome, email, password, id, history, password2 }));
    dispatch(actions.registerRequest({ nome, email, password, id, history }));
  }

  return (
    <Container>
      <h1>{!id ? 'Crie Sua Conta' : 'Alterar Dados'}</h1>
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

        <button type="submit">{id ? 'Salvar' : 'Criar conta'}</button>
      </Form>
    </Container>
  );
}

// Sempre que precisarmos de um parametro na função React. precisamos colocar props como parametro
// e tambem usar a extensao PropTypes, e chamas a seguinta função
Register.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
