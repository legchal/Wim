/* eslint-disable array-callback-return */
import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as UsersAdmActions from '../../store/actions/useradmin.actions';
import { Form } from '@rocketseat/unform';
import SelectUnform from '../../components/SelectUnform';
import { Button, Card, Row, Col, Checkbox, Icon } from 'antd';
import InputUnform from '../../components/InputUnform';
import { toast } from 'react-toastify';

export default function CreateLogin({ match, history }) {
  const [type, setType] = useState('');
  const [optionsEmail, setOptionsEmail] = useState([]);
  const [optionsName, setOptionsName] = useState([]);
  const [userEditing, setUserEditing] = useState({});
  const dispatch = useDispatch();
  const salesman = useSelector(state => state.salesman);
  const userAdm = useSelector(state => state.usersAdm);
  const created = useSelector(state => state.usersAdm.created);
  const [revealPassword, setRevealPassword] = useState(false); 

  useEffect(() => {
    if (type === 'salesman') {
      dispatch({ type: '@salesman/GET_ALL_REQUEST' });
    }
  }, [type]);

  useEffect(() => {
    if (match.params.id) {
      dispatch(UsersAdmActions.getUserByIdRequest(match.params.id));
    } else {
      dispatch(UsersAdmActions.clearUserById());
    }
  }, []);

  useEffect(() => {
    setUserEditing(userAdm.userById);
  }, [userAdm])

  useEffect(() => {
    const optionsNameSalesman = [];
    const optionsEmailSalesman = [];
    salesman.allSalesman.map(s => {
      let names = { id: s.name, title: s.name };
      optionsNameSalesman.push(names);
      let emails = { id: s.email, title: s.email };
      optionsEmailSalesman.push(emails);
      setOptionsEmail(optionsEmailSalesman);
      setOptionsName(optionsNameSalesman);
    })
  }, [salesman])
  
  useEffect(()=>{
    if(created.length !== 0){
        setTimeout(() => {
        history.push('/list-users');
      }, 400)
    }
  }, [created])

  const optionsType = [
    { id: 'super', title: 'Administrador' },
    { id: 'salesman', title: 'Vendedor' },
    { id: 'support', title: 'Suporte' },
    { id: 'finance', title: 'Financeiro' },
    { id: 'developer', title: 'Desenvolvedor'}, 
  ];

  function handleSubmit(data) {
    if(data.permission === ""){
      toast.error('Selecione um tipo de usuário!');
      return;
    }else if(data.name === ""){
      toast.error('Digite o Nome do usuário!');
      return;
    }else if(data.email === ""){
      toast.error('Digite um E-mail para o usuário!');
      return;
    }else if(data.password === ""){
      toast.error('Digite uma senha com no minimo 5 caracteres!');
      return;
    }else if (match.params.id) {
      dispatch(UsersAdmActions.editUserRequest(data, match.params.id));
      setTimeout(()=>{
        dispatch(UsersAdmActions.getAllUsersRequest());
        history.push('/list-users');
      },400)
    }else{
      dispatch(UsersAdmActions.createUserRequest(data));
    }
  }

  function onChange(e) {
      if(e.target.checked){
        setRevealPassword(true);
      }else {
        setRevealPassword(false);
    }
  }
  
  return (
    <Fragment>
      <Card
        title={
          <Row>
            <Icon type="user-add" style={{fontSize:'20px'}}/> <span style={{fontSize:'20px'}}> {match.params.id ? 'Editar Usuário' : 'Criar Usuário'}</span >
          </Row>

        }>
        <Form onSubmit={handleSubmit} initialData={match.params.id ? userEditing : ''}>
          <Row>
            <Col xs={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 2 }} sm={{ span: 12 }}>
              <SelectUnform
                contentLabel="Tipo de usuário"
                name="permission"
                value={type !== '' ? type : userEditing.permission}
                options={optionsType}
                onChange={(e) => setType(e.target.value)}
              />
            </Col>
            {type !== 'salesman' ? (
              <Fragment>
                <Col xs={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 2 }} sm={{ span: 12 }} >
                  <InputUnform contentLabel={'Digite o nome do usuário'} nameInput={'name'}></InputUnform>
                </Col>
                <Col xs={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 2 }} sm={{ span: 12 }} >
                  <InputUnform contentLabel={'Digite o E-mail do usuário'} nameInput={'email'}></InputUnform>
                </Col>
              </Fragment>
            ) : (
                <Fragment>
                  <Col xs={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 2 }} sm={{ span: 12 }}>
                    <SelectUnform contentLabel="Selecione o nome do vendedor" name="name" options={optionsName} />
                  </Col>
                  <Col xs={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 2 }} sm={{ span: 12 }}>
                    <SelectUnform contentLabel="Selecione o E-mail do vendedor" name="email" options={optionsEmail} />
                  </Col>
                </Fragment>
              )}
              
              <Col  xs={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 2 }} sm={{ span: 12 }}>
                {revealPassword && 
                  <InputUnform contentLabel={'Digite uma senha'} nameInput={'password'} type="password"></InputUnform>
                }
                {match.params.id ?
                  <Checkbox style={{marginTop: '15px'}} onChange={onChange}>Alterar senha</Checkbox> :
                  <InputUnform contentLabel={'Digite uma senha'} nameInput={'password'} type="password"></InputUnform>
                }
              </Col>
          </Row>
          <Button size="large" type="primary" htmlType="submit" style={{ float: 'right' }}> Enviar </Button>
        </Form>
      </Card>
    </Fragment>
  );
}
