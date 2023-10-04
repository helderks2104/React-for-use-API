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
  // Pegamos de dentro do props > match > params > id
  const id = get(match, 'params.id', '');
  const [foto, setFoto] = useState('');

  // Quando a pagina for renderizada, ja vai verificar se o aluno tem uma foto e altomaticamente
  // ira setar a foto para mostrar ao usuario
  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/alunos/${id}`);
        // Verificando se tem foto do aluno no banco de dados, caso nao tenha, sera false
        setFoto(get(data, 'Fotos[0].url', ''));
      } catch {
        toast.error('Erro ao obter imagem');
        history.push('/');
      }
    };
    getData();
  }, [id]);

  // Função para envio de imagem ao banco de dados
  const handleChange = async e => {
    // Declarando a foto escolhida pelo usuario em uma variavel
    const newFoto = e.target.files[0];
    // Criando uma URL da foto do usuario, pois o axios nao envia foto 'direto' ao banco de dados
    const fotoURL = URL.createObjectURL(newFoto);

    // Setando o Estado
    setFoto(fotoURL);

    // Criando um formulario com a foto para o axios enviar para o BD
    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', newFoto);

    // Tentativa de envio para o banco de dados:
    try {
      // Fazemos um post com: ('ROTA', Formulario que criamos, e um objeto ==> )
      // >> headers: {'content-Type': 'multipart/form-data'}
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
