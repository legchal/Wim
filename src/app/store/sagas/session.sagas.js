import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '../../services/history';
import api from '../../services/axios';

import { signInSuccess, signFailure, verifyTokenSuccess, verifyTokenFailure, signOut as SignOutSession } from '../actions/session.actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'session', {
      email,
      password,
    });

    const { data } = response;
    
    if(data.error) {
      toast.error('Credenciais invalidas!');
      yield put(signFailure());
      return;
    }
    
    api.defaults.headers['Authorization'] = `Bearer ${data.token}`;

    yield put(signInSuccess(data));

    history.push('/company-selection');
  } catch (err) {
    toast.error('Credenciais inválidas ou você não tem permissão para acessar! ');
    yield put(signFailure());
  }
}

export function signOut() {
  localStorage.clear();
  history.push('/');
}

export function* verifyToken() {
  try {
    
    const { data } = yield call(api.get, 'session', { headers: { Authorization: `Bearer ${localStorage.getItem('@token')}`}});

    
    yield put(verifyTokenSuccess(data.validToken));

    if(!data.validToken) {
      yield put(SignOutSession());
    }
  } catch(err) {
    
    yield put(verifyTokenFailure());
    yield put(SignOutSession());
    toast.error('Não foi possível verificar o token, você será deslogado por motivos de segurança');
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('@auth/VERIFY_TOKEN_REQUEST', verifyToken)
]);