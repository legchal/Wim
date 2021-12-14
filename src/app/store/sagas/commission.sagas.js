import { takeLatest, call, put, all } from 'redux-saga/effects';
import { 
    getAllSalesSuccess, 
    getAllSalesFailure,
    getAllSalesmansSuccess,
    getAllSalesmansFailure,
    getSalesmanSalesSuccess,
    getSalesmanSalesFailure
} from '../actions/commission.actions';
import api from '../../services/axios';
import { toast } from 'react-toastify';

export function* getAllSales() {
  try {
    const { data } = yield call(api.get, '/commission/sales-all');

    yield put(getAllSalesSuccess(data.sales));

  } catch(err) {
    toast.error('Falha ao consultar os dados, tente mais tarde');
    yield put(getAllSalesFailure())
  }
}

export function* getAllSalesmans() {
  try {
    const { data } = yield call(api.get, '/commission/salesmans-all');

    yield put(getAllSalesmansSuccess(data.salesmans));

  } catch(err) {
    toast.error('Falha ao consultar os dados, tente mais tarde');
    yield put(getAllSalesmansFailure())
  }
}

export function* getSalesmanSales({ payload }) {
  try{
    const { data } = yield call(api.get, `/commission/sales/${payload}`);
    
    yield put(getSalesmanSalesSuccess(data.sales));
    
  }catch (err) {
    toast.error('Falha ao consultar os dados, tente mais tarde');
    yield put(getSalesmanSalesFailure());
  }
}

export default all([
  takeLatest('@commission/GET_ALL_REQUEST', getAllSales),
  takeLatest('@commission/GET_ALL_SALESMANS_REQUEST', getAllSalesmans),
  takeLatest('@commission/GET_ALL_SALESMAN_SALES_REQUEST', getSalesmanSales),
])