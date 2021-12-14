import React, { useEffect } from 'react';
import logo from '../../images/logo-login.png';
import { useDispatch, useSelector } from 'react-redux';
import { SignRequest } from '../../store/actions/session.actions';
import { Form, Input } from '@rocketseat/unform';
import { Icon, Button, Card, Spin } from 'antd';

export default function Login(props, {history}) {
  const dispatch = useDispatch();
  const session = useSelector(state => state.auth);
  useEffect(() => {
    if (localStorage.getItem('@token')) {
      props.history.push('/company-selection');
    }
  }, [session])

  function handleSubmit(data) {
    const { email, password } = data;

    dispatch(SignRequest(email, password));
  }

  return (
    <div className="wrapper">
      <Card className="login-card">
        <img alt="logo-login" src={logo} width="100%" />
        <Form onSubmit={handleSubmit} className="login-form">
          <Icon type="user" className="icons-position" />
          <Input className="ant-input input-login" name="email" placeholder="&nbsp;Login" />
          <Icon type="lock" className="icons-position2" />
          <Input className="ant-input input-login" name="password" type="password" placeholder="&nbsp;Senha" />
          <Button block type="primary" htmlType="submit" className="login-form-button">
            Login
          </Button>

          <div style={{display: 'flex', justifyContent: 'center', marginLeft: '0.7rem'}}>
            <Icon type="lock" className="icon-recovery-pass" />
            <a className="forgot-password" href="/forgot-password" onClick={() => { props.history.push('/forgot-password'); }}>Esqueceu a sua senha ?</a>
          </div>

          <div className="container-spinner">

            <Spin  spinning={session.loading} size="large" />
          </div>
        </Form>
      </Card>
    </div>
  );
}
