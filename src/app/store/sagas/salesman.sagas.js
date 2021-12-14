import { takeLatest, call, put, all } from 'redux-saga/effects';
import { 
  getAllSalesmanSuccess, 
  getAllSalesmanFailure, 
  createSalesmanSuccess, 
  createSalesmanFailure,
  getAllSalesSuccess,
  getAllSalesFailure,
  getSalesmanByIdSuccess,
  getSalesmanByIdFailure
} from '../actions/salesman.actions';
import api from '../../services/axios';
import { toast } from 'react-toastify';

export function* getAll() {
  try {
    const { data } = yield call(api.get, 'salesman');
    
    yield put(getAllSalesmanSuccess(data.salesmans));

  } catch(err) {
    toast.error('Falha ao consultar os dados, tente mais tarde');
    yield put(getAllSalesmanFailure())
  }
}

export function* createSalesman({ payload }) {
  try {

    const { data } = yield call(api.post, 'salesman', payload);
    yield put(createSalesmanSuccess(data));

    toast.success('Vendedor cadastrado com sucesso');

  } catch(err) {
    toast.error(err.response.data.error);
    yield put(createSalesmanFailure());
  }
}

export function* getSales({ payload }) {
  try {
    const { data } = yield call(api.get, `sales/${payload}`);
    
    yield put(getAllSalesSuccess(data.sales));

  } catch(err) {
    toast.error('Falha ao consultar os dados, tente mais tarde');
    yield put(getAllSalesFailure())
  }
}

export function* getSalesmanById({ payload }) {
  try {
    const { data }  = yield call(api.get, `salesman/${payload}`);

    yield put(getSalesmanByIdSuccess(data.salesman));
  } catch(err) {
    toast.error('Falha ao buscar o vendedor, verifique se o mesmo não foi excluido');
    yield put(getSalesmanByIdFailure());
  }
}

export default all([
  takeLatest('@salesman/GET_ALL_REQUEST', getAll),
  takeLatest('@salesman/CREATE_SALESMAN_REQUEST', createSalesman),
  takeLatest('@salesman/GET_ALL_SALES_REQUEST', getSales),
  takeLatest('@salesman/GET_SALESMAN_BY_ID_REQUEST', getSalesmanById)
]);