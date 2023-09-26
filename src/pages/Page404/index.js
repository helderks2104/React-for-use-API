import React from 'react';
import { Container } from '../../styles/GlobalStyles';
import { Error } from './styled';

export default function Page404() {
  return (
    <Container>
      <Error>Esta Pagina Não Existe!</Error>
    </Container>
  );
}
