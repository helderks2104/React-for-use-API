import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';
import validar from '../../validations/validatorUsers';

export default function Register(props) {
  const dispatch = useDispatch();
  const { id, email: emailStored, nome: nomeStored } = useSelector(state => state.auth.user);
  const { history } = props;

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  React.useEffect(() => {
    if (!id) return;

    setNome(nomeStored);
    setEmail(emailStored);
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

Register.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
