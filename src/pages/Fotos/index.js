import React, { useState } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyles';
import { Title, Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import { loginFailure } from '../../store/modules/auth/actions';

export default function Fotos({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', '');
  const [foto, setFoto] = useState('');

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(get(data, 'Fotos[0].url', ''));
      } catch {
        toast.error('Erro ao obter imagem');
        history.push('/');
      }
    };
    getData();
  }, [id]);

  const handleChange = async e => {
    const newFoto = e.target.files[0];
    const fotoURL = URL.createObjectURL(newFoto);

    setFoto(fotoURL);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', newFoto);

    try {
      await axios.post('/fotos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Foto enviada com sucesso!');
    } catch (err) {
      const { status } = get(err, 'response', '');
      toast.error('Erro ao enviar imagem!');
      if (status === 401) dispatch(loginFailure());
    }
  };

  return (
    <Container>
      <Title>Alterar Foto</Title>
      <Form>
        <label htmlFor="foto">
          {foto ? <img src={foto} alt="Foto" crossOrigin="" /> : 'Selecionar'}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
