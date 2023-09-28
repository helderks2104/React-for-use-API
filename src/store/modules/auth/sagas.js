import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* loguinRequest({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(axios.post, '/tokens', { email, password });
    yield put(actions.loginSuccess({ ...response.data }));
    toast.success('Logado com sucesso!');

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    history.push(payload.prevPath);
  } catch (e) {
    toast.error('Usuario ou senha invalidos!');
    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const { nome, email, password, id } = payload;
  try {
    if (!id) {
      yield call(axios.post, '/users', { nome, email, password });
      yield put(actions.registerCreatedSuccess({ nome, email, password }));
      history.push('/login');
      toast.success('Registrado com sucesso!');
    } else {
      yield call(axios.put, '/users', { nome, email, id, password: password || undefined });
      yield put(actions.registerUpdatedSuccess({ nome, email, password }));
      history.push('/');
      toast.success('Alterado com sucesso!');
    }
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);

    if (status === 401) {
      toast.error('Você precisa fazer login novamente.');
      yield put(actions.loginFailure());
      return history.push('/login');
    }

    if (errors.length > 0) {
      errors.map(error => toast.error(error));
    } else {
      toast.error('Erro desconhecido');
    }

    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.REGISTER_REQUEST, registerRequest),
  takeLatest(types.LOGIN_REQUEST, loguinRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
]);
