import React, { useEffect, useState, Fragment } from 'react';
import { Form } from '@rocketseat/unform';
import { Card, Button, Icon, Input, Select, DatePicker, Popover, Row} from 'antd';
import ReactSelect from '../../components/ReactSelect';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersRequest, addCalledRequest, allCalledRequest } from '../../store/actions/called.actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFileSignature} from '@fortawesome/free-solid-svg-icons';
import * as yup from 'yup';
import moment from 'moment';
import '../../styles/style.css';

export default function CalledRegister({ history }) {
  const dispatch = useDispatch();
  const called = useSelector(state => state.called);
  const [description, setDescription] = useState('');
  const [errorType, setErrorType] = useState('');
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState([]);
  const [date, setDate] = useState([]);
  const [popover, setPopOver] = useState(false);
  const { TextArea } = Input;
  const { Option, OptGroup } = Select;
  const schema = yup.object().shape({
    user_id_request: yup.number().required('Selecione um usuário'),
    reason: yup.string(),
    description: yup.string(),
    date: yup.date(),
  });

  useEffect(() => { 
    dispatch(getAllUsersRequest());
  }, []);

  useEffect(() => {
    setOptions(called.users);
  }, [called.users]);

  function handleSubmitCalled(data, { resetForm }) {
    if(errorType === '') {
      setPopOver(true);
      return;
    }

    let called = { ...data, description, error_type: errorType, date: date, reason: title };
     dispatch(addCalledRequest(called));
     resetForm();

     setTimeout(() => {
      dispatch(allCalledRequest(moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')));
      history.push('/called-list');
     }, 500)
  }

  return (
    <Fragment>
      <Card
        title={
          <Row>
            <FontAwesomeIcon icon={faFileSignature}></FontAwesomeIcon>
            <Icon style={{fontSize:'20px'}}/> <span style={{fontSize:'20px'}}>Cadastrar Chamado</span >
          </Row>
        }>
      
        <Form className="form-users" onSubmit={handleSubmitCalled} schema={schema}>
          <div className="centraliza-input">
            <label className= "label-contentLabel2">Tipo:</label>
            <div style={{ width: "100%", marginBottom: "5px", marginTop: "2px" }}>
            <Popover
              placement="bottom"
              arrowPointAtStart
              content={
              <div>
                <label>
                  <Icon type="warning" style={{ color: '#ffd700', fontSize: '25px'}}/>
                &nbsp;&nbsp; Necessário selecionar um tipo!
                </label>
              </div>}
              trigger="click"
              visible={popover}
            >
              <Select defaultValue="Selecione o tipo"  style={{ marginBottom: "7px"}} onFocus={() => setPopOver(false)} onChange={(e) => setErrorType(e)}>
                <OptGroup label="Solicitações">
                  <Option value="Duvidas">Duvidas</Option> 
                  <Option value="Pedidos">Pedidos</Option>
                  <Option value="Sugestões">Sugestões</Option>
                  <Option value="Importação de base de Dados">Importação de base de Dados</Option>
                  <Option value="Solicitação de troca de cartão para Recorrência">Solicitação de troca de cartão para Recorrência</Option>
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
            </Popover>
            </div>
            <ReactSelect name='user_id_request' options={options} label="E-mail:" required />
            <div style={{marginTop: "12px"}}>
              <label className="label-contentLabel2" style={{ float: "left" }}>Titulo:</label>
              <Input onChange={(e) => setTitle(e.target.value)} required className="register-called"/>
            </div>
            <center>
              <div style={{marginTop: "2px", marginBottom: "12px" }}>
                <label className="label-contentLabel2" style={{ float: "left", marginBottom: '3px' }}>Data:</label> <br />
                  <DatePicker
                    style={{ width: "100%" }}
                    showTime 
                    placeholder= {moment().format("DD/MM/YYYY HH:mm")}
                    disabled
                  />
              </div>
            </center>
            <div style={{marginTop: "-12px"}}>
              <label className="label-contentLabel2" style={{ float: "left", marginBottom: '3px' }}>Descrição:</label> <br />
              <TextArea
                placeholder="Descreva o motivo da abertura do chamado"
                autosize={{ minRows: 3, maxRows: 5 }}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <br />
            <br />
            <center>
              <Button className="btn btn-att" htmlType="submit" onClick={() => {
                setDate(moment().format("MM/DD/YYYY HH:mm"));
              }}><Icon type="phone" />Cadastrar</Button>
            </center>
          </div>
        </Form>
      </Card>
    </Fragment>
  );
}
