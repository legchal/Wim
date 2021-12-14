import { takeLatest, call, put, all } from 'redux-saga/effects';
import { 
  getAllTicketSuccess, 
  getAllTicketFailure,
} from '../actions/ticket.actions';
import api from '../../services/axios';
import { toast } from 'react-toastify';

export function* getAll() {
  try {
    const { data } = yield call(api.get, 'ticket-list');
    yield put(getAllTicketSuccess(data.ticketIsValid));

  } catch(err) {
    toast.error('Falha ao consultar os dados, tente mais tarde');
    yield put(getAllTicketFailure())
  }
}

export default all([
  takeLatest('@ticket/GET_ALL_TICKET_REQUEST', getAll),
])