import React from 'react';
import logo from '../../images/logo-login.png';
import { Form, Input } from '@rocketseat/unform';
import { Icon, Button, Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft, faShare,

} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import swal from 'sweetalert2';
import {Loader2} from '../../components/Loader'
import {getEmail} from '../../services/email';


export default function ForgotPassword(props) {
  const[email, setEmail] = useState('');
  const[loading, setLoading] = useState(false);

  async function handleSubmit(){
    if(email === ''){
      swal(
        'Erro!',
        'Digite um E-mail para continuar com a recuperação!',
        'warning'
      )
      return
    }
    setLoading(true);

    const emailGet = await getEmail(email);

    setLoading(false);
    if(emailGet.data.email === false){
      swal(
        'Erro!',
        'E-mail não cadastrado!',
        'warning'
      )
      return
    }
    if(emailGet.status === 200 && emailGet.data.email === true){
      swal(
        'E-mail enviado!',
        'Verifique seu E-mail para continuar a recuperação da senha!',
        'success'
      ).then(() => {
        props.history.push('/');
      })
    }
  }

  return(
    <div className="wrapper">
      <Card className="login-card">
        <img alt="logo-login" src={logo} width="100%" />
        <Form className="login-form">
          <p className="text-form-password">Digite o <strong>E-mail vinculado</strong> a conta para recuperação da senha: </p>
          <Icon type="user" className="icons-position" />
          <Input className="ant-input input-login" name="email" placeholder="&nbsp;Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <div className="buttons-recovery-password">
            <Button block type="danger"  htmlType="submit" className="login-form-button-password" onClick={() => {props.history.push('/')}}>
              <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>&nbsp;&nbsp;Voltar
            </Button>
            <Button block type="primary" htmlType="submit" className="login-form-button-password" onClick={handleSubmit}>
              Enviar&nbsp;&nbsp;<FontAwesomeIcon icon={faShare}></FontAwesomeIcon>
            </Button>
          </div>
          <Loader2 
            loading={loading}
          />
        </Form>
      </Card>
    </div>
  );

  
}
