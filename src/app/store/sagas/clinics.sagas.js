import { takeLatest, call, put, all } from 'redux-saga/effects';
import {
  getAllStatesSuccess,
  getAllStatesFailure,
  getClinicWimSuccess,
  getClinicWimFailure,
  updateClinicWimSuccess,
  updateClinicWimFailure,
  getUsersClinicSuccess,
  getUsersClinicFailure,
  destroyClinicSuccess,
  destroyClinicFailure,
  verifyPasswordSuccess, 
  verifyPasswordFailure,
  releaseAccessSuccess,
  releaseAccessFailure,
  getPaidSubscriptionsSuccess,
  getPaidSubscriptionsFailure,
  updateEndPaidSubscriptionSuccess,
  updateEndPaidSubscriptionFailure,
  getSubscriptionsSuccess,
  getSubscriptionsFailure,
  updateSubscriptionSuccess,
  updateSubscriptionFailure,
  deleteRecurrencySuccess,
  deleteRecurrencyFailure,
  changeCardSuccess,
  changeCardFailure
} from '../actions/clinics.actions';
import api from '../../services/axios';
import { toast } from 'react-toastify';


export function* getAllStates() {
  try {
    const { data } = yield call(api.get, '/clinics-all');
    yield put(
      getAllStatesSuccess(
        data.clinicsInactives, 
        data.allClinicsAndInterval, 
        data.clinicsActives,
        data.realActives[0]
      ));

  } catch(err) {
    toast.error('Falha ao consultar os dados, tente mais tarde');
    yield put(getAllStatesFailure())
  }
}

export function* getClinicWim({ payload }) {
  try {
    const { data } = yield call(api.get, `/clinic/${payload}`);
    
    yield put(getClinicWimSuccess(data));

  } catch(err) {
    toast.error('Falha ao consultar os dados, tente mais tarde');
    yield put(getClinicWimFailure())
  }
}

export function* updateClinicWim({ payload }) {
  try {    

    const { data } = yield call(api.put, `/clinic-wim/${payload.id}`, payload.data);
    
    yield put(updateClinicWimSuccess(data.clinic));
    
    toast.success('Clínica atualizada com sucesso!');
  } catch(err) {
    toast.error('Ocorreu um erro ao atualizar a clínica' + err.message);
    yield put(updateClinicWimFailure())
  }
}

export function* getUsersFromClinic({ payload }) {
  try {
    const { data } = yield call(api.get, `/clinic/${payload}/users`);
    
    yield put(getUsersClinicSuccess(data.users));

  } catch(err) {
    toast.error('Falha ao consultar os dados, tente mais tarde');
    yield put(getUsersClinicFailure())
  }
}

export function* destroyClinic({ payload }){
  try {
    yield call(api.delete, `/clinics/destroy/${payload.id}`);
    yield put(destroyClinicSuccess());

  } catch(err) {
    toast.error('Falha ao apagar o usuário, tente mais tarde!');
    yield put(destroyClinicFailure());
  }
}

export function* verifyPassword({ payload }){
  try {
    const { data } = yield call(api.post, `/verify-password`, { password: payload.password });
    
    yield put(verifyPasswordSuccess(data.message));

  } catch(err) {
    toast.error('Falha ao verificar senha, tente mais tarde!');
    yield put(verifyPasswordFailure());
  }
}

export function* releaseAccess({ payload }){
  try {
    const { data } = yield call(api.put, `/clinics/extends-access/${payload.id}`);
    
    yield put(releaseAccessSuccess(data.message));
    toast.success('Acesso liberado por mais 7 dias com sucesso!');
  } catch(err) {
    toast.error('Falha ao verificar senha, tente mais tarde!');
    yield put(releaseAccessFailure());
  }
}

export function* getPaidSubscriptions({ payload }){
  try{
    const {data} = yield call(api.get,`/clinic-paid-subscription/${payload.id}`);
    yield put(getPaidSubscriptionsSuccess(data.data));

  }catch(err){
    toast.error('Falha ao buscar pagamentos!');
    yield put(getPaidSubscriptionsFailure());
  }
}

export function* updateEndPaidSubscription({ payload }){
  try{

    const {data} = yield call(api.put,`/clinic-paid-subscription-update`, { id: payload.id, data: payload.date});

      yield put(updateEndPaidSubscriptionSuccess(data));

      toast.success('Data alterada com sucesso!');

  }catch(err){
    toast.error('Falha ao atualizar data!');
    yield put(updateEndPaidSubscriptionFailure());
  }
}

export function* getSubscriptions({ payload }){
  try{
    const {data} = yield call(api.get,`/clinic-subscription/${payload.id}`);
    yield put(getSubscriptionsSuccess(data));

  }catch(err){
    toast.error('Falha ao buscar subscriptions!');
    yield put(getSubscriptionsFailure());
  }
}

export function* updateSubscription({ payload }){
  let error = false;
  try{
    const {data} = yield call(api.put,`/clinic-subscription-update`, { id: payload.id, data: payload.date});
    yield put(updateSubscriptionSuccess(data, error));     
  }catch(err){
    error = true;
    yield put(updateSubscriptionFailure(error));
  }
}
export function* deleteRecurrency({ payload }){
  try{
    const { data } = yield call(api.put,`/clinic-delete-recurrency`, { id: payload.data });

    yield put(deleteRecurrencySuccess(data));     
    
    toast.success('Recorrência cancelada!');
  }catch(err){
      toast.error('Erro ao cancelar a recorrência');
      yield put(deleteRecurrencyFailure(err));
  }
}
export function* changeCard({ payload }){
  try{

    const { data } = yield call(api.put,`/change-card`, { id: payload.data });

    yield put(changeCardSuccess(data));     

    toast.success('Troca de cartão liberada!');
  }catch(err){
      toast.error('Erro ao liberar troca de cartao!');
      yield put(changeCardFailure(err));
  }
}


export default all([
  takeLatest('@clinics/GET_ALL_STATES_REQUEST', getAllStates),
  takeLatest('@clinics/GET_CLINIC_WIM_REQUEST', getClinicWim),
  takeLatest('@clinics/UPDATE_CLINIC_WIM_REQUEST', updateClinicWim),
  takeLatest('@clinics/GET_USERS_CLINIC_REQUEST', getUsersFromClinic),
  takeLatest('@clinics/DESTROY_CLINIC_REQUEST', destroyClinic),
  takeLatest('@clinics/VERIFY_PASSWORD_REQUEST', verifyPassword),
  takeLatest('@clinics/RELEASE_ACCESS_REQUEST', releaseAccess),
  takeLatest('@clinics/GET_PAID_SUBSCRIPTIONS_REQUEST', getPaidSubscriptions),
  takeLatest('@clinics/UPDATE_END_PAID_SUBSCRIPTIONS_REQUEST', updateEndPaidSubscription),
  takeLatest('@clinics/GET_SUBSCRIPTIONS_REQUEST', getSubscriptions),
  takeLatest('@clinics/UPDATE_SUBSCRIPTIONS_REQUEST', updateSubscription),
  takeLatest('@clinics/DELETE_RECURRENCY_REQUEST', deleteRecurrency),
  takeLatest('@clinics/CHANGE_CARD_REQUEST', changeCard),

])