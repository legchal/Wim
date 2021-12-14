import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '../../services/axios';
import { toast } from 'react-toastify';
import 
{ getAllUsersSuccess, 
  getAllUsersFailure, 
  getUserByIdSuccess, 
  getUserByIdFailure,
  createUserSucess,
  createUserFailure,
  editUserSucess,
  editUserFailure,
  destroyUserSuccess,
  destroyUserFailure
} from '../actions/useradmin.actions';

export function* getAll() {
  try {
    const { data } = yield call(api.get, '/user-adm');

    yield put(getAllUsersSuccess(data.users));
  
  } catch(err) {
    toast.error('Falha ao consultar os dados, tente mais tarde');
    yield put(getAllUsersFailure());
  }
}

export function* getById({ payload }) {
  try {
    const { data } = yield call(api.get, `user-adm/${payload}`);
    
    yield put(getUserByIdSuccess(data.users));

  } catch(err) {
    toast.error('Falha ao consultar os dados, tente mais tarde');
    yield put(getUserByIdFailure());
  }
}

export function* createUser({ payload }) {
  
  try {
    const {data} = yield call(api.post, '/user-adm', payload);
    yield put(createUserSucess(data));

    toast.success('Usuário criado com sucesso!'); 
  } catch(err) {
    toast.error(err.response.data.error);
    yield put(createUserFailure());
  }
}

export function* editUser({ payload }) {
  try {
    
    yield call(api.put, `/user-adm/${payload.id}`, payload.data);
    toast.success('Usuário alterado com sucesso!');
    yield put(editUserSucess());

  } catch(err) {
    toast.error('Falha ao editar o usuário, tente mais tarde!');
    yield put(editUserFailure());
  }
}

export function* destroyUser({ payload }) {
  try {
    yield call(api.delete, `/user-adm/${payload.id}`);
    toast.success('Usuário deletado com sucesso !');
    yield put(destroyUserSuccess());

  } catch(err) {
    toast.error('Falha ao apagar o usuário, tente mais tarde!');
    yield put(destroyUserFailure());
  }
}

export default all([
  takeLatest('@userAdmin/GET_ALL_USERS_ADM_REQUEST', getAll),
  takeLatest('@userAdmin/GET_USER_ADM_BY_ID_REQUEST', getById),
  takeLatest('@userAdmin/CREATE_USER_ADM_REQUEST', createUser),
  takeLatest('@userAdmin/EDIT_USER_ADM_REQUEST', editUser),
  takeLatest('@userAdmin/DESTROY_USER_ADM_REQUEST', destroyUser)
]);
