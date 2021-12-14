import { Card, Button, Input, Icon, Select, Divider } from 'antd';
import { Form } from '@rocketseat/unform';
import InputUnform from '../../components/InputUnform';
import moment from 'moment';
import React, { useEffect, useState, Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCalledByIdRequest, getAllUsersRequest, updateCalledRequest, updateCalledStatusRequest, getMessagesFromCalledsRequest, createMessageFromCalledRequest } from '../../store/actions/called.actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUserEdit, faLockOpen, faShare } from '@fortawesome/free-solid-svg-icons';
import { getClinicFromUserId } from '../../services/clinic';

export default function ({ match, history }) {
  const dispatch = useDispatch();
  const called = useSelector(state => state.called.calledById);
  const messages = useSelector(state => state.called.messages);
  const messageCreated = useSelector(state => state.called.messageCreated);
  const [calledData, setCalledData] = useState([]);
  const [editData, setEditData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState('');
  const [errorType, setErrorType] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const { TextArea } = Input;
  const { OptGroup, Option} = Select;

  useEffect(() => {
    dispatch(getCalledByIdRequest(match.params.id));
    dispatch(getMessagesFromCalledsRequest(match.params.id));
    dispatch(getAllUsersRequest());
  }, []);
  
  useEffect(() => {
    if(called !== null){
      if(!isEditing){ 
        setCalledData({
          reason: called.data.reason,
          user_email: called.data.User.email,
          user_support_name: called.data.userSupport.name,
          date_create: moment(called.data.date).format('DD/MM/YYYY HH:mm'),
          date_solution: called.data.date_solution !== null ? 
            moment(called.data.date_solution).format('DD/MM/YYYY HH:mm') : 'Sem resolução',
          status: called.data.status === 'pending' ? 'Pendente' : 
                  called.data.status === 'open' ? 'Aberto' : 'Fechado',
          openBy: called.data.userDeveloper !== null ? called.data.userDeveloper.name : 'Não aberto',
          userDeveloper: called.data.userDeveloper !== null && called.data.status === 'closed' ? called.data.userDeveloper.name : 'Não resolvido',
          error_type: called.data.error_type
        });
      }
    }
  }, [called]);

  useEffect(() => {
    if(isEditing) {
      setDescription(called.data.description);
      setEditData({
        reason: called.data.reason,
        user_email: called.data.User.email
      });
    }
  }, [isEditing]);

async function createNewMessage(){
  const data = {
    called_id: match.params.id,
    message: newMessage,
  }
  await dispatch(createMessageFromCalledRequest(data));
  await setNewMessage('');
  dispatch(getMessagesFromCalledsRequest(match.params.id));
}  

useEffect(() => {
  if(messageCreated.message !== undefined) {
    dispatch(getMessagesFromCalledsRequest(match.params.id));
  }
}, [messages, messageCreated]);

function handleSubmitUpdateCalled (data) {
  
  let id = match.params.id;

  let calledSubmit ={ ...data, description, error_type: errorType };
  
  dispatch(updateCalledRequest(id, calledSubmit));
  
  setTimeout( () => {
    dispatch(getAllUsersRequest());
    history.push('/called-list');
  } , 500);  
}

  async function pushToClinic(id){

    const clinic_id = await getClinicFromUserId(id);

    history.push(`/clinic-editing/${clinic_id.ClinicId}`)
  }

return (
  <Fragment>
    <Card
        title='INFORMAÇÕES DO CHAMADO'
      >
        {!isEditing &&
        <Fragment>
        <Form className="form-users" initialData={calledData}>
          <div className="centraliza-input" style={{ marginBottom: '25px' }}>
            <InputUnform nameInput='reason' contentLabel="Título" disabled />
            <InputUnform nameInput='user_email' contentLabel="E-mail do Usuário" disabled />
            <InputUnform nameInput='error_type' contentLabel="Tipo" disabled />
            <InputUnform nameInput='user_support_name' contentLabel="Chamado aberto por" disabled />
            <div className='label-contentLabel'>
              <label>Descrição</label>
              <TextArea style={{color: "#545454", marginLeft: "-4px !important"}} value={called !== null ? called.data.description : ''}
                disabled
                placeholder="Descrição:"
                autosize={{ minRows: 1}}
              />
            </div>
            <InputUnform nameInput='date_create' contentLabel='Criado' em disabled />
            <InputUnform nameInput='status' contentLabel='Status' disabled />
            <InputUnform nameInput='openBy' contentLabel='Aberto pelo desenvolvedor' disabled/>
            <InputUnform nameInput='userDeveloper' contentLabel='Resolvido por' disabled/>
            <InputUnform nameInput='date_solution' contentLabel='Resolvido em' disabled />
            <br />
            <br />
            <center>
            {called !== null && called.data.status === 'pending' &&
                <Fragment>
               <Button 
               disabled={called !== null && called.data.status === 'closed' ? true : false}
               className="btn color-btn-editing"
               onClick= {() => {
               setIsEditing(true)}} 
               >
               <FontAwesomeIcon icon={faUserEdit}></FontAwesomeIcon>&nbsp;
               Editar Chamado
              </Button>&nbsp;
              </Fragment>
            }
            {localStorage.getItem('@permission') === 'developer' &&
              <Fragment>
              <Button
                className="btn ant-btn-primary"
                htmlType="submit" 
                disabled={called !== null && called.data.status === 'pending' ? false : true}
                onClick={() => {
                  dispatch(updateCalledStatusRequest(called.data.id, {status: 'open'}));
                  setTimeout(() => {
                    dispatch(getCalledByIdRequest(match.params.id));
                  }, 300);
                }}
                >
                <FontAwesomeIcon icon={faLockOpen}></FontAwesomeIcon>&nbsp;
                Atender Chamado
              </Button>&nbsp;
              <Button 
                className="btn btn-closedCalled"
                htmlType="submit" 
                disabled={called !== null && called.data.status === 'open' ? false : true}
                onClick={() => {
                  dispatch(updateCalledStatusRequest(called.data.id, {status: 'closed',  date_solution: moment()}));
                  setTimeout(() => {
                    dispatch(getCalledByIdRequest(match.params.id));
                    history.push('/called-list');
                  }, 300);
                }}
                >
                <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>&nbsp;
                Encerrar chamado
              </Button>&nbsp;
              {called !== null && called.data.status === "open" && 
                <Button 
                  className="btn ant-btn-primary"
                  onClick={() => pushToClinic(called.data.user_id_request) }
                  >
                  <FontAwesomeIcon icon={faShare}></FontAwesomeIcon>&nbsp;
                  Acessar dados da clínica
              </Button>
              }
              </Fragment>
            }
            </center>
          </div>
        </Form>

        </Fragment>
        }
        {isEditing &&
          <Form className="form-users" initialData={editData} onSubmit={handleSubmitUpdateCalled} >
          <div className="centraliza-input" style={{ marginBottom: '25px' }}>
            <InputUnform nameInput='reason' contentLabel="Título:" />
            <InputUnform nameInput='user_email' contentLabel="E-mail do Usuário" disabled />
            <label className= "label-contentLabel2">Tipo:</label>
              <Select defaultValue={called !== null ? called.data.error_type : ''} style={{ marginBottom: "7px"}} onChange={(e) => setErrorType(e)}>
                <OptGroup label="Solicitações">
                  <Option value="Duvidas">Duvidas</Option> 
                  <Option value="Pedidos">Pedidos</Option>
                  <Option value="Sugestões">Sugestões</Option>
                  <Option value="Importação de base de Dados">Importação de base de Dados</Option>
                </OptGroup>
                <OptGroup label="Erros">
                  <Option value="Radiografia">Radiografia</Option>
                  <Option value="Agendamento">Agendamento</Option>
                  <Option value="Atendimento">Atendimento</Option>
                  <Option value="Captação de imagem">Captação de imagem</Option>
                  <Option value="Fluxo de Caixa">Fluxo de Caixa</Option>
                  <Option value="Relatório">Relatório</Option>
                  <Option value="Pagamento Mensalidade">Pagamento Mensalidade</Option>
                </OptGroup>
              </Select>
            <label className= "label-contentLabel2">Descrição:</label>
            <TextArea style={{color: "#545454"}} defaultValue={called !== null ? called.data.description : ''}
              placeholder="Descrição:"
              onChange={(e) => setDescription(e.target.value)}
              autosize={{ minRows: 1}}
            />
            <br />
            <br />
            <center>
              <Button className="btn btn-att" htmlType="submit"><Icon type="edit"/>Salvar</Button>
            </center>
          </div>
          </Form>
        }
        <Divider />
        <div id="new-message" className="centraliza-input" style={{ marginTop: '25px' }}>
          <label className= "label-contentLabel2" style={{ fontSize: '18px' }}>Nova Mensagem:</label>
          <TextArea 
            style={{color: "#545454", marginBottom: '5px' }}
            placeholder="Digite sua mensagem:"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            autosize={{ minRows: 4}}
          />
            <Button 
              className="btn btn-att"
              style={{float: "right", marginBottom: '20px',}}
              onClick={() => createNewMessage()}
            >
              Salvar Mensagem
            </Button>
          <Divider />
        </div>
        <h2 style={{ marginTop: "10px" }} className="centraliza-input">Histórico:</h2>
        <div id="messages" className="centraliza-input" style={{ marginTop: '25px' }}>
          {
            messages !== null && messages.length > 0 &&
            messages.map((msg) => (
              <div key={msg.id} style={{ marginBottom: '5px'}}>
                <label>Enviada por:&nbsp; {msg.user.name}</label>
                <TextArea 
                  style={{color: "#545454"}} 
                  value={msg.message}
                  placeholder="Descrição:"
                  autosize={{ minRows: 1}}
                  disabled
                />
                <span style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end' 
                }} >
                  {moment(msg.created_at).format('DD/MM/YYYY HH:mm:ss')}
                </span>
              </div>
            ))
          }
        </div>

      </Card>
  </Fragment>
);

}