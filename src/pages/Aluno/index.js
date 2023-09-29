import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import history from '../../services/history';
import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import { ProfilePicture, Form, Title } from './styled';
import validatorAlunos from '../../validations/validatorAlunos';
import * as actions from '../../store/modules/auth/actions';

export default function Aluno({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', '');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [foto, setFoto] = useState('');

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Fotos[0].url', '');
        console.log({ data });

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setPeso(data.peso);
        setAltura(data.altura);
        setIdade(data.idade);
      } catch (err) {
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) errors.map(error => toast.error(error));
        history.push('/');
      }
    }

    getData();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!id) {
      try {
        if (!validatorAlunos({ nome, sobrenome, email, idade, peso, altura })) {
          const { data } = await axios.post('/alunos', { nome, sobrenome, email, idade, peso, altura });
          toast.success('Aluno(a) criado(a) com sucesso!');
          history.push(`/alunos/${data.id}/edit`);
        }
      } catch (err) {
        toast.error('Erro ao criar aluno!');
        console.log(err);
      }
    } else {
      try {
        if (!validatorAlunos({ nome, sobrenome, email, idade, peso, altura })) {
          await axios.put(`/alunos/${id}`, { nome, sobrenome, email, idade, peso, altura });
          toast.success('Aluno(a) editado(a) com sucesso!');
        }
      } catch (err) {
        const status = get(err, 'response.status', 0);
        const data = get(err, 'response.data', {});
        const errors = get(data, 'errors', []);

        if (errors.length > 0) {
          errors.map(error => toast.error(error));
        } else {
          toast.error('Erro desconhecido');
        }

        if (status === 401) dispatch(actions.loginFailure());
      }
    }
  };

  return (
    <Container>
      <Title>{id ? 'Editar aluno' : 'Novo Aluno'}</Title>

      {id && (
        <ProfilePicture>
          {foto ? <img src={foto} alt={nome} /> : <FaUserCircle size={180} />}
          <Link to={`/fotos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
        <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" />
        <input type="text" value={sobrenome} onChange={e => setSobrenome(e.target.value)} placeholder="Sobrenome" />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input type="number" value={idade} onChange={e => setIdade(e.target.value)} placeholder="Idade" />
        <input type="text" value={peso} onChange={e => setPeso(e.target.value)} placeholder="Peso" />
        <input type="text" value={altura} onChange={e => setAltura(e.target.value)} placeholder="Altura" />

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
