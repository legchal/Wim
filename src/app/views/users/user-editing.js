import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@rocketseat/unform';
import { Button, Card, Row, Col, Icon, Tooltip, Divider, Input, Select, List } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { getUserWimRequest, updateUserWimRequest, resetRequest } from '../../store/actions/users.actions';
import InputUnform from '../../components/InputUnform';
import swal from 'sweetalert2';
import { getClinicFromUserId } from '../../services/clinic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


export default function UserEditing({ match, history, id, isModal}) {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const [userEditing, setUserEditing] = useState({});
  const [cpf, setCpf] = useState('');
  const [mobile, setMobile] = useState('');
  const [phone, setPhone] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [userId, setUserId] = useState('')
  const { Option } = Select;

  useEffect(() => {
    if(match && match.params) {
      dispatch(getUserWimRequest(match.params.id));
      setUserId(match.params.id);
    } else {
      dispatch(getUserWimRequest(id));
      setUserId(id);
    }
  }, [match])

  useEffect(() => {
    if(users !== undefined && users.UserWim !== undefined && users.UserWim.length > 0){
      console.log(userId)
      let currentUser = users.UserWim.find(currentUserFind => (currentUserFind.id === parseFloat(userId)));
      console.log(currentUser)
      setCurrentUser(currentUser);
      let allUsers = users.UserWim.filter(user => user.id !== parseFloat(userId))
      setAllUsers(allUsers);
    }
  }, [users]);

  useEffect(() => {
    if(currentUser !== undefined && currentUser.cpf !== undefined){
      setUserEditing(currentUser);
      setCpf(currentUser.cpf);
      setMobile(currentUser.mobile);
      setPhone(currentUser.phone);
    }
  },[currentUser]);

  function handleSubmit(data) {
    let dataUpdate ={
      ...data,
      cpf,
      mobile,
      phone
    }
    swal({
      title: 'Confirmar alterações',
      text: 'Todas as informações serão alteradas.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar!',
      closeOnConfirm: false,
      reverseButtons: true, 
    }).then((result) => {
      if (result.value) {
        dispatch(updateUserWimRequest(dataUpdate, userId));
        setCpf(cpf);
        setTimeout(() => history.push('/user-manage'), 500);
      }
    })
  }

  function mCPF(cpf){
    cpf=cpf.replace(/\D/g,"")
    cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
    setCpf(cpf);
  }

  function mMobile(v) {
    let r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
      r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    }
    setMobile(r)
  }
  
  function mPhone(v){
    let r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 9) {
      r = r.replace(/^(\d\d)(\d{4})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } 
    setPhone(r)
  }

  function resetPassword() {
    swal({
      title: 'Atenção',
      text: 'Deseja realmente resetar a senha desse usuário? Esta ação é irreversivel!',
      showCancelButton: true,
      showConfirmButton: true,
      showLoaderOnConfirm: true,
      type: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Não resetar!',
      confirmButtonText: 'Sim, resetar senha!'
    }).then(async (result) => {
      if (result.value) {
        dispatch(resetRequest(userId));
        swal('Senha alterada!',
          'Senha alterada com sucesso, a nova senha é: <strong>"dentista123"</strong>, recomende que o usuário resete sua senha no próximo login!',
          'info').then(() => {
            toast.success('Senha alterada com sucesso!');
            history.push('/user-manage');
          });
      }
    });
  }

  async function getClinicAndPush(){
    const { ClinicId } = await getClinicFromUserId(userId);
    history.push(`/clinic-editing/${ClinicId}`)
  }
  

  return (
    <Fragment>
      
      <Card
        title={
          <Row>
            <Icon type="user" style ={{ fontSize: '20px'}}/> <span style ={{ fontSize: '20px'}}> Editar Usuário</span>


            {
              allUsers.length > 0 &&
              <Select 
              style={{ width: '14rem', float:'right'}}
              //allowClear
              value={'Selecione um Usuário:'}
            >
              {
                allUsers.length && 
                allUsers.map(totalUser => (
                  <Option
                    onClick={(e) => {
                      if(isModal) {
                        dispatch(getUserWimRequest(e.key));
                        setUserId(e.key);
                      } else {
                        history.push(`/user-editing/${e.key}`)
                      }
                    }}
                    value={totalUser.id}
                  > {totalUser.name}
                  </Option>
                ))
              }
            </Select>
            }
            
          </Row>
        }
      >
        <Form className="form-users" onSubmit={handleSubmit} initialData={userEditing}>
          <Row gutter={150} justify="center" type='flex'>
            <Col span={9}>
              <InputUnform contentLabel={'Nome:'} nameInput={'name'}></InputUnform>
            </Col>
            <Col span={9}>
              <InputUnform contentLabel={'Email:'} nameInput={'email'} ></InputUnform>
            </Col>
            <Col style={{ marginBottom: '20px' }} span={9}>
              <label  className="label-contentLabel2" style={{ float: "left" }}>Celular:</label>
                <Input onChange={(e) => mMobile(e.target.value)} value={mobile} placeholder={"(00) 00000-0000"} className="register-called" />
            </Col>
            <Col style={{ marginBottom: '20px' }} span={9}>
              <label  className="label-contentLabel2" style={{ float: "left" }}>Telefone:</label>
                <Input onChange={(e) => mPhone(e.target.value)} value={phone} placeholder={"(00) 0000-0000"} className="register-called" />
            </Col>
            <Col style={{marginTop: '-15px', marginBottom: '15px'}} span={9}>
              <label  className="label-contentLabel2" style={{ float: "left" }}>CPF:</label>
                <Input onChange={(e) => mCPF(e.target.value)} value={cpf} placeholder={"000.000.000-00"} maxLength={14} className="register-called" />
            </Col>
            <Col style={{ marginBottom: '20px' }} span={9}>
              <InputUnform contentLabel={'Cep:'} nameInput={'zip_code'} disabled></InputUnform>
            </Col>
            <Col style={{ marginBottom: '20px' }} span={9}>
              <InputUnform contentLabel={'Rua:'} nameInput={'street'} disabled></InputUnform>
            </Col>
            <Col style={{ marginBottom: '20px' }} span={9}>
              <InputUnform contentLabel={'bairro:'} nameInput={'neighborhood'} disabled></InputUnform>
            </Col>
            <Col style={{ marginBottom: '20px' }} span={9}>
              <InputUnform contentLabel={'Dia do Pagamento:'} nameInput={'payment_day'} disabled></InputUnform>
            </Col>
            <Col style={{ marginBottom: '20px' }} span={9}>
              <InputUnform contentLabel={'Nome Cobrança:'} nameInput={'p_nome_cobranca'} disabled></InputUnform>
            </Col>

         { 
         currentUser !== undefined &&
          <>
            <Col style={{marginTop: '-15px', marginBottom: '15px'}} span={9}>
              <label  className="label-contentLabel2" style={{ float: "left" }}>Grupo do Usuário:</label>
              <Input disabled value={currentUser.group === "dentist" ? "Dentista" : "Secretária"} placeholder={"Grupo Pertencente"} maxLength={14} className="recurrent-input" />
            </Col>
            {
              currentUser.group === "dentist" && 
                <Col style={{marginTop: '-15px', marginBottom: '15px'}} span={9}>
                  <label  className="label-contentLabel2" style={{ float: "left" }}>Tipo do Usuário:</label>
                  <Input disabled value={currentUser.is_super_admin === true ? "O usuário é Administrador!" : "O usuário não é Administrador!"} 
                  placeholder={"Tipo de Usuário"} maxLength={14} className="recurrent-input"/>
                </Col>
            }
          </>
          }

          </Row>

          <Row type='flex' justify='center'>
            <Col style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }} xs={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 0 }} sm={{ span: 12 }}>
              <div style={{marginTop: '20px'}}>
                <Button className="btn btn-att" htmlType="submit"><Icon type="save" />Atualizar</Button>
              </div>
            </Col>
            <Col style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }} xs={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 0 }} sm={{ span: 12 }}>
              <div style={{marginTop: '20px'}}>
                <Button className="btn ant-btn-primary" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={ () => getClinicAndPush() }>Clínica<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '10px'}} /></Button>
              </div>
            </Col>
          </Row>
        </Form>
        <Divider></Divider>
        { localStorage.getItem('@permission') === 'developer' &&
          <Row type='flex' justify='center'>
            <Col style={{ marginTop: '10px' }} xs={{ span: 12, offset: 6 }} lg={{ span: 14, offset: 2 }} sm={{ span: 12 }}>
                <label style={{fontSize: '1rem', marginTop: '0.7rem'}}>DAYPASS:</label>
                <input type="text" disabled={true} id="daypass" className="input-wrapper" name="phone" value={userEditing.daypass}></input>
            </Col>
            <Col style={{ marginTop: '35px', marginLeft: '4px', marginBottom: '20px' }} xs={{ span: 12, offset: 6 }} lg={{ span: 2, offset: 0 }} sm={{ span: 12 }}>
              <CopyToClipboard
                text={userEditing.daypass}
                onCopy={() => { }}>
                <Tooltip title="Copiar">
                  <Button className="btn-copy" onClick={() => toast.info('Daypass copiado.', { autoClose: 1500 })}><Icon type="copy" /></Button>
                </Tooltip>
              </CopyToClipboard>
            </Col>
            <Divider></Divider>
          </Row>
        }
        <center><Button onClick={resetPassword} style={{ marginTop: '20px' }} type='danger'><Icon type="undo" />Resetar Senha!</Button></center>

      </Card>

    </Fragment>
  );
}

