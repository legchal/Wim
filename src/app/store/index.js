import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import auth from './reducers/session.reducer';
import salesman from './reducers/salesman.reducer';
import users from './reducers/users.reducer';
import usersAdm from './reducers/useradm.reducers';
import clinics from './reducers/clinics.reducer';
import finance from './reducers/finance.reducer';
import commission from './reducers/commission.reducer';
import profile from './reducers/profile.reducer';
import called from './reducers/called.reducer';
import ticket from './reducers/ticket.reducer';
import log from './reducers/log.reducer';

import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore( 
  combineReducers({
    auth,
    salesman,
    users,
    usersAdm,
    clinics,
    finance,
    commission,
    profile,
    called,
    ticket,
    log,
  }),
  applyMiddleware(sagaMiddleware)
  );

sagaMiddleware.run(rootSaga);


export default store;