import { takeLatest, call, put, all } from 'redux-saga/effects';
import {
  getAllStatesSuccess,
  getAllStatesFailure,
  getUserWimSuccess,
  getUserWimFailure,
  updateUserWimSuccess,
  updateUserWimFailure,
  resetFailure,
  resetSuccess,
} from '../actions/users.actions';
import api from '../../services/axios';
import { toast } from 'react-toastify';

export function* getAllStates() {
  try {
    const { data } = yield call(api.get, '/users-all');
    
    yield put(getAllStatesSuccess(data.users));

  } catch(err) {
    toast.error('Falha ao consultar os dados, tente mais tarde');
    yield put(getAllStatesFailure())
  }
}

export function* getUserWim({ payload }) {
  try {
    const { data } = yield call(api.get, `/user-wim/${payload.id}`);
    
    yield put(getUserWimSuccess(data.user));

  } catch(err) {
    toast.error('Falha ao consultar os dados, tente mais tarde');
    yield put(getUserWimFailure())
  }
}

export function* updateUserWim({ payload }) {
  try {
    
    const { data } = yield call(api.put, `/user-wim/${payload.id}`, payload.data);
    
    yield put(updateUserWimSuccess(data.user));

    toast.success('Usuário atualizado com sucesso!');
  } catch(err) {
    toast.error('Ocorreu um erro ao atualizar o usuário' + err.message);
    yield put(updateUserWimFailure())
  }
}

export function* resetPassword({ payload }) {
  try {    
    const { data } = yield call(api.put, `/user-wim-reset-password/${payload}`);
    
    yield put(resetSuccess(data.message));
  } catch(err) {
    toast.error('Ocorreu um erro ao resetar a senha');
    yield put(resetFailure())
  }
}

export default all([
  takeLatest('@users/GET_ALL_STATES_REQUEST', getAllStates),
  takeLatest('@users/GET_USER_WIM_REQUEST', getUserWim),
  takeLatest('@users/UPDATE_USER_WIM_REQUEST', updateUserWim),
  takeLatest('@users/RESET_REQUEST', resetPassword),
])