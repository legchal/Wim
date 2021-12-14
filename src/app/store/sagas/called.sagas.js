import { takeLatest, call, put, all } from 'redux-saga/effects';
import {
  addCalledSuccess,
  addCalledFailure,
  getAllUsersSuccess,
  getAllUsersFailure,
  allCalledSuccess,
  allCalledFailure,
  allCalledOpenSuccess,
  allCalledOpenFailure,
  getCalledByIdSuccess,
  getCalledByIdFailure,
  updateCalledSuccess,
  updateCalledFailure,
  updateCalledStatusSuccess,
  updateCalledStatusFailure,
  getMessagesFromCalledsSuccess,
  getMessagesFromCalledsFailure,
  createMessageFromCalledSuccess,
  createMessageFromCalledFailure,
  allCalledOpenWimDentalSuccess,
  allCalledOpenWimDentalFailure,
} from '../actions/called.actions';
import api from '../../services/axios';
import { toast } from 'react-toastify';

export function* getAllUsers() {
  try {
    const { data } = yield call(api.get, '/users-wim/get-all');
    
    yield put(getAllUsersSuccess(data.users));

  } catch (err) {
    toast.error('Falha ao consultar os dados, tente mais tarde');
    yield put(getAllUsersFailure())
  }
}

export function* addCalled({ payload }) {
  try {
    yield call(api.post, '/calleds', payload.data);
    yield put(addCalledSuccess());
    toast.success('Chamado cadastrado com sucesso!');
  } catch (err) {
    toast.error('Ocorreu um erro ao cadastrar o chamado' + err.message);
    yield put(addCalledFailure())
  }
}

export function * allCalleds({ payload }) {
  try {
    const { data } = yield call(api.get, `/calleds/${payload.start}/${payload.end}`);
    yield put(allCalledSuccess(data.calleds));

  } catch( err ){
    toast.error('Ocorreu um erro ao listar todos os chamados' + err.message);
    yield put(allCalledFailure);
  }
}

export function * allOpenCalleds() {
  try {
    const { data } = yield call(api.get, `/calleds-open/`);
    yield put(allCalledOpenSuccess(data.calleds));

  } catch( err ){
    toast.error('Ocorreu um erro ao listar todos os chamados: ' + err.message);
    yield put(allCalledOpenFailure);
  }
}

export function * getCalledByIdRequest({ payload }) {
  try {
    const { data } = yield call (api.get, `/calleds/${payload.id}`);
    yield put(getCalledByIdSuccess(data.called))
  } catch (err) {
    toast.error('Não foi possível exibir os detalhes desse chamado !')
    yield put(getCalledByIdFailure);
  }
}

export function * updateCalled({ payload }) {
  try {

    yield call (api.put, `/calleds/${payload.id}`, payload.data);
    toast.success('Chamado atualizado com sucesso');
    yield put(updateCalledSuccess());
  } catch (err) {
    toast.error('Não foi possivel atualizar este chamado');
    yield put(updateCalledFailure());
  }
}

export function * updateStatusRequest({ payload }) {
  try {
  
    yield call (api.put, `/calleds/resolve/${payload.id}`, payload.data);
    toast.success('Status atualizado com sucesso');
    yield put(updateCalledStatusSuccess());
  } catch (err) {
    toast.error('Não foi possivel atualizar o status deste chamado');
    yield put(updateCalledStatusFailure());
  }
}

export function * getMessagesFromCalleds({ payload }) {
  try {
    const { data } = yield call (api.get, `/messages-from-calleds/${payload.id}`);
    yield put(getMessagesFromCalledsSuccess(data.messages))
  } catch (err) {
    toast.error('Não foi possível carregar as mensagens referentes ao chamado!')
    yield put(getMessagesFromCalledsFailure());
  }
}

export function * createMessageFromCalled({ payload }) {
  try {
      const { data } = yield call (api.post, `/messages-from-calleds`, {
      message: payload.message,
      called_id: payload.called_id,
    });
    yield put(createMessageFromCalledSuccess(data));
    toast.success('Mensagem adicionada com sucesso!');
  } catch (err) {
    toast.error('Não foi possível criar a nova mensagem referente ao chamado!')
    yield put(createMessageFromCalledFailure());
  }
}

export function * getAllOpensWimDental() {
  try {
    const { data } = yield call(api.get, `/calleds-open/wim-dental`);
    yield put(allCalledOpenWimDentalSuccess(data.calleds));
  } catch( err ){
    toast.error('Ocorreu um erro ao listar todos os chamados: ' + err.message);
    yield put(allCalledOpenWimDentalFailure());
  }
}

export default all([
  takeLatest('@called/GET_ALLUSERS_REQUEST', getAllUsers),
  takeLatest('@called/ADDCALLED_REQUEST', addCalled),
  takeLatest('@called/ALL_CALLED_REQUEST', allCalleds),
  takeLatest('@called/ALL_CALLED_OPEN_REQUEST', allOpenCalleds),
  takeLatest('@called/CALLED_BYID_REQUEST', getCalledByIdRequest),
  takeLatest('@called/CALLED_UPDATE_REQUEST', updateCalled),
  takeLatest('@called/CALLED_UPDATE_STATUS_REQUEST', updateStatusRequest),
  takeLatest('@called/GET_MESSAGES_FROM_CALLEDS_REQUEST', getMessagesFromCalleds),
  takeLatest('@called/CREATE_MESSAGE_FROM_CALLED_REQUEST', createMessageFromCalled),
  takeLatest('@called/ALL_CALLED_OPEN_WIM_DENTAL_REQUEST', getAllOpensWimDental), 
])