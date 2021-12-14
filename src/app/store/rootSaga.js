import { all } from 'redux-saga/effects';
import authSagas from './sagas/session.sagas';
import salesmanSagas from './sagas/salesman.sagas';
import usersSagas from './sagas/users.sagas';
import usersAdmSagas from './sagas/usersAdm.sagas';
import clinicsSagas from './sagas/clinics.sagas';
import financeSagas from './sagas/finance.sagas';
import commissionSagas from './sagas/commission.sagas';
import profileSagas from './sagas/profile.sagas';
import calledSagas from './sagas/called.sagas';
import ticketSagas from './sagas/ticket.sagas';
import logSagas from './sagas/log.sagas';

export default function* rootSaga() {
  return yield all([
    authSagas,
    salesmanSagas,
    usersSagas,
    usersAdmSagas,
    clinicsSagas,
    financeSagas,
    commissionSagas,
    profileSagas,
    calledSagas,
    ticketSagas,
    logSagas,
  ]);
}