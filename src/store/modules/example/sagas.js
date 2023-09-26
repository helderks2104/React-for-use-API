import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';

const requisicao = () =>
  // eslint-disable-next-line implicit-arrow-linebreak
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

function* exemploRequest() {
  try {
    yield call(requisicao);
    yield put(actions.clicaBotaoSuccess());
  } catch (e) {
    toast.error('Deu Erro');
    yield put(actions.clicaBotaoFailure());
  }
}

export default all([takeLatest(types.BOTAO_CLICADO_REQUEST, exemploRequest)]);
