import React from 'react';
import logo from '../../images/logo-login.png';
import { Form, Input } from '@rocketseat/unform';
import { Icon, Button, Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import swal from 'sweetalert2';
import {Loader2} from '../../components/Loader';
import {resetPassword} from '../../services/email';

export default function ResetPassword(props) {
  const[password, setPassword] = useState('');
  const[loading,setLoading] = useState(false);

  const token = props.match.params;

  async function handleSubmit(){
    if(password === ''){
      swal(
        'Erro!',
        'Digite uma senha para continuar!',
        'warning'
      )
      return
    }
    setLoading(true);

    const reset = await resetPassword(password, token);

    setLoading(false);
    if(reset.status === 200){
      swal(
        'Sucesso!',
        'Senha alterada com sucesso!',
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
          <p className="text-form-password">Digite a <strong>nova senha: </strong></p>
          <Icon type="user" className="icons-position" />
          <Input className="ant-input input-login" name="password" type="password" placeholder="&nbsp;Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <div className="buttons-recovery-password">
            <Button block type="danger"  htmlType="submit" className="login-form-button-password" onClick={() => {props.history.push('/')}}>
              <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>&nbsp;&nbsp;Cancelar
            </Button>
            <Button block type="primary" htmlType="submit" className="login-form-button-password" onClick={handleSubmit}>
              Alterar&nbsp;&nbsp;<FontAwesomeIcon icon={faShare}></FontAwesomeIcon>
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
