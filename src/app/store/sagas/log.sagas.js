import { takeLatest, call, put, all } from 'redux-saga/effects';
import {
    getLogAcessSuccess,
    getLogAcessFailure,
    getLogAcessMonthSuccess,
    getLogAcessMonthFailure,
    getLogAcessDaySuccess,
    getLogAcessDayFailure,
    getRegisterLogSuccess, 
    getRegisterLogFailure
} from '../actions/log.actions';
import api from '../../services/axios';
import { toast } from 'react-toastify';

export function* getLogAccess({payload}){
    try{
        const { data } = yield call(api.get, `/logs/${payload.start}/${payload.end}`);
    
        yield put(getLogAcessSuccess(data));
    }catch(err){
        toast.error('Falha ao consultar os dados, tente novamente');
        yield put(getLogAcessFailure());
    }
}

export function* getLogMonthAccess({payload}){
    try{
        const { data } = yield call(api.get, `/logs/${payload.start}/${payload.end}/${payload.value}`);
    
        yield put(getLogAcessMonthSuccess(data));
    }catch(err){
        toast.error('Falha ao consultar os dados, tente novamente');
        yield put(getLogAcessMonthFailure());
    }
}

export function* getLogDayAccess({payload}){
    try{
        const { data } = yield call(api.get, `/logs/${payload.start}/${payload.end}`);
    
        yield put(getLogAcessDaySuccess(data));
    }catch(err){
        toast.error('Falha ao consultar os dados, tente novamente');
        yield put(getLogAcessDayFailure());
    }
}

export function* getRegisterLog({ payload }){
    try{
        const { data } = yield call(api.get, `/registers/${payload.start}/${payload.end}`);
        yield put(getRegisterLogSuccess(data));
    }catch(err){
        toast.error('Falha ao consultar os dados, tente novamente');
        yield put(getRegisterLogFailure());
    }
}

export default all([
    takeLatest('@log/GET_ALL_LOG_REQUEST', getLogAccess),
    takeLatest('@log/GET_Month_LOG_REQUEST', getLogMonthAccess),
    takeLatest('@log/GET_DAY_LOG_REQUEST', getLogDayAccess),
    takeLatest('@log/GET_REGISTER_LOG_REQUEST', getRegisterLog)
  ])