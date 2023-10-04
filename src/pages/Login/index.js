import React from 'react';
// Fazer o usso das TAGS Html
import { toast } from 'react-toastify';
// Envio de Mensagens para o usuario
import { isEmail } from 'validator';
// Validador de email
import { get } from 'lodash';
// Forma de uso de operador ternario
import { useDispatch } from 'react-redux';
// Disparar uma ação
import { Container } from '../../styles/GlobalStyles';
// Styles Global
import { Form } from './styled';
// Importando form estilizado
import * as actions from '../../store/modules/auth/actions';
// Importando as ações para usso do useDispatch()

// Exporto para o App.js Para Renderizar o React
export default function Login(props) {
  // Props é um objeto que vem do elemento React do router dom
  const dispatch = useDispatch();
  // Disparador de ação
  const prevPath = get(props, 'location.state.prevPath', '/');
  // Guardo a pagina anterior do usuario
  const [email, setEmail] = React.useState('');
  // Armazeno no estado Email e Password como Vazios
  const [password, setPassword] = React.useState('');

  async function handleSubmit(e) {
    // Função chamada ao apertar o botao SUBMIT
    e.preventDefault();
    // PreventDefault Padrao

    // Validação do formulario
    let formErrors = false;

    if (!email || !password || password.length < 6 || !isEmail(email)) {
      toast.error('Usuario ou senha invalido!');
      formErrors = true;
    }
    if (formErrors) return;
    // FIM

    dispatch(actions.loginRequest({ email, password, prevPath }));
    // Se o if Passar ira disparar uma ação para o actions.js
  }

  // React
  return (
    <Container>
      <h1>Login</h1>

      <Form onSubmit={e => handleSubmit(e)}>
        {/* Chama a função que dispara o dispatch */}
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
  // FIM
}
