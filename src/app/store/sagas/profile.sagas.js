import { takeLatest, call, put, all } from 'redux-saga/effects';
import {
  getProfileSuccess,
  getProfileFailure,
  updateProfileSuccess,
  updateProfileFailure,
  updateAvatarSuccess,
  updateAvatarFailure,
} from '../actions/profile.actions';
import api from '../../services/axios';
import { toast } from 'react-toastify';

export function* getProfile() {
  try {
    const { data } = yield call(api.get, '/profile');
    
    yield put(getProfileSuccess(data.user));

  } catch (err) {
    toast.error('Falha ao consultar os dados, tente mais tarde');
    yield put(getProfileFailure())
  }
}

export function* updateProfile({ payload }) {
  try {
    yield call(api.put, '/profile/update', payload.data);
    yield put(updateProfileSuccess());
    toast.success('Usuário atualizado com sucesso!');
  } catch (err) {
    toast.error('Ocorreu um erro ao atualizar o usuário' + err.message);
    yield put(updateProfileFailure())
  }
}

export function* avatarProfile({ payload }) {
  try {
    const { data } = yield call(api.post, '/profile/avatar', payload.data, { headers: {
      'content-type': 'multipart/form-data'
    }});
    localStorage.setItem('@avatar', data.urlAvatar);
    yield put(updateAvatarSuccess());
    toast.success('Avatar enviado com sucesso!');
  } catch (err) {
    toast.error('Ocorreu um erro ao enviar avatar' + err.message);
    yield put(updateAvatarFailure());
  }
}

export default all([
  takeLatest('@profile/GET_PROFILE_REQUEST', getProfile),
  takeLatest('@profile/UPDATE_PROFILE_REQUEST', updateProfile),
  takeLatest('@profile/UPDATE_AVATAR_REQUEST', avatarProfile)
])