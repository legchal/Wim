import React , {Fragment}from 'react';
import { Provider } from 'react-redux';
import Routes from './Routes';
import store from './app/store';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { allCalledOpenWimDentalRequest } from './app/store/actions/called.actions';
import { notification } from 'antd';
import audio from './app/media/audioguitarra.mp3';
import './app/config/reactotronConfig';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
let after = 0;

function App() {
  
  // async function checkCalleds() {
  //   store.dispatch(allCalledOpenWimDentalRequest());
  //   let before = store.getState();
  //   if(before.called.seeOpens !== 0){
  //     if(after === 0) {
  //       after = store.getState();
  //     }
  //     if(before.called.seeOpens !== after.called.seeOpens){
  //       notification.open({
  //         placement: 'bottomRight',
  //         message: [<b> Novo Chamado </b>],
  //         description: [
  //           <div style={{ cursor: 'pointer' }}>
  //             <audio src={audio} autoPlay></audio>
  //             <span>
  //               {' '}
  //               <b>Chamado aberto: </b> Solicitação de troca de cartão.
  //             </span>
  //             <span>
  //               {' '}<br />
  //               <b>Clique aqui para ser redirecionado a listagem de chamados.</b>
  //             </span>
  //           </div>,
  //         ],
  //         onClick: () => window.location.href = "https://admin.wimdental.com/called-list",
  //         style: {
  //           backgroundColor: '#d9d9d9',
  //         },
  //       });
  //         after = store.getState();
  //     }
  //   }
  //   setTimeout(() => {
  //     checkCalleds();
  //   }, 60000);
  // }

  // checkCalleds();
  
  return(
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <Routes />
            <ToastContainer autoClose={5000} /> 
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
}

export default App;
