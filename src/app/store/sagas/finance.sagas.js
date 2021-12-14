import { takeLatest, call, put, all } from 'redux-saga/effects';
import { 
 getPaymentsPerDateSuccess,
 getPaymentsPerDateFailure,
 getPrevisionNewClinicsSuccess,
 getPrevisionNewClinicsFailure, 
 newExpenseSuccess,
 newExpenseFailure,
 getAllCashFlowFailure,
 getAllCashFlowSuccess,
 getCashFlowEditingFailure,
 getCashFlowEditingSuccess,
 updateExpenseSuccess,
 updateExpenseFailure,
 deleteExpenseSuccess,
 deleteExpenseFailure,
 getRecipeSuccess,
 getRecipeFailure,
 paidExpenseFailure,
 paidExpenseSuccess,
 activesPendingSuccess,
 activesPendingFailure,
} from '../actions/finance.actions';
import api from '../../services/axios';
import { toast } from 'react-toastify';

export function* getPerDate({ payload }) {
  try {
    const { data } = yield call(api.get, `/finance/get-per-date/${payload.start}/${payload.end}`);

    yield put(getPaymentsPerDateSuccess(data.payingUsers));

  } catch(err) {
    toast.error('Falha ao consultar os dados, tente mais tarde');
    yield put(getPaymentsPerDateFailure())
  }
}

export function* previsionClinics() {
  try {
    const { data } = yield call(api.get, '/finance/prevision-clinics');

    yield put(getPrevisionNewClinicsSuccess(data.previsionClinics));
  } catch (err) {
    toast.error('Falha ao consultar previsão de usuários, tente recarregar a página!');

    yield put(getPrevisionNewClinicsFailure());
  }
}

export function* newExpense({ payload }) {
  try {
    yield call(api.post, '/finance/cashflow', payload.data);

    yield put(newExpenseSuccess());
    toast.success('Cadastrado com sucesso!');
  } catch (err) {
    toast.error('Falha ao cadastrar despesa, tente novamente!');

    yield put(newExpenseFailure());
  }
}

export function* getCashFlow({ payload }) {
  try {
    const { data } = yield call(api.get, `/finance/cashflow/${payload.start}/${payload.end}`);
    
    yield put(getAllCashFlowSuccess(data));
  } catch (err) {
    toast.error('Falha ao consultar dados do fluxo de caixa, recarrege a página!');

    yield put(getAllCashFlowFailure());
  }
}

export function* getCashFlowEditing({ payload }) {
  try {
    const { data } = yield call(api.get, `/finance/cashflow/${payload.id}`);
    
    yield put(getCashFlowEditingSuccess(data));
  } catch (err) {
    toast.error('Falha ao consultar dados do fluxo de caixa, recarrege a página!');

    yield put(getCashFlowEditingFailure());
  }
}

export function* updateExpense({ payload }) {
  try {
    yield call(api.put, `/finance/cashflow/${payload.id}`, payload.data);

    yield put(updateExpenseSuccess());
    toast.success('Atualizado com sucesso!');
  } catch (err) {
    toast.error('Falha ao cadastrar despesa, tente novamente!');

    yield put(updateExpenseFailure());
  }
}

export function* deleteExpense({ payload }) {
  try {
    const body = {
      delete_all_installments: payload.delete_all_installments
    }
    
    yield call(api.post, `/finance/cashflow/${payload.id}`, body );

    yield put(deleteExpenseSuccess());
    toast.success('Deletado com sucesso!');
  } catch (err) {
    toast.error('Falha ao deletar despesa, tente novamente!');

    yield put(deleteExpenseFailure());
  }
}

export function* getRecipe({ payload }) {
  try {
    const{ data } = yield call(api.get, `/finance/recipe/cashflow/${payload.start}/${payload.end}`);

    yield put(getRecipeSuccess(data.recipe));
    
  } catch (err) {
    toast.error('Falha ao buscar receita, recarregue a página!');

    yield put(getRecipeFailure());
  }
}

export function* paidExpense({ payload }) {
  try {
    yield call(api.put, `/finance/cashflow/set-payment/${payload.id}`);

    yield put(paidExpenseSuccess());
    toast.success('Pagamento efetuado com sucesso!');
  } catch (err) {
    toast.error('Falha ao realizar pagamento, tente novamente!');

    yield put(paidExpenseFailure());
  }
}

export function* activePending({ payload }) {
  try {
    const { data } = yield call(api.get, `/finance/prevision/${payload.start}`);
    
    yield put(activesPendingSuccess(data.activesPending));
  } catch (err) {
    toast.error('Falha ao buscar informações de receitas, tente novamente!');

    yield put(activesPendingFailure());
  }
}

export default all([
  takeLatest('@finance/GET_ALL_PAYMENTS_PER_DATE_REQUEST', getPerDate),
  takeLatest('@finance/PREVISION_NEW_CLINICS_REQUEST', previsionClinics),
  takeLatest('@finance/NEW_EXPENSE_REQUEST', newExpense),
  takeLatest('@finance/UPDATE_EXPENSE_REQUEST', updateExpense),
  takeLatest('@finance/GET_ALL_CASH_FLOW_REQUEST', getCashFlow),
  takeLatest('@finance/GET_CASH_FLOW_EDITING_REQUEST', getCashFlowEditing),
  takeLatest('@finance/DELETE_EXPENSE_REQUEST', deleteExpense),
  takeLatest('@finance/GET_RECIPE_REQUEST', getRecipe),
  takeLatest('@finance/PAID_EXPENSE_REQUEST', paidExpense),
  takeLatest('@finance/ACTIVES_PENDING_REQUEST', activePending),
])