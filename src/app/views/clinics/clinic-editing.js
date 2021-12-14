import React, { useEffect, useState, Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@rocketseat/unform';
import { Card, Col, Row, Button, Icon, Tooltip, Select as SelectAntd, Modal, Divider} from 'antd';
import UserEditing from '../users/user-editing';
import InputUnform from '../../components/InputUnform';
import { getClinicWimRequest, updateClinicWimRequest, releaseAccessRequest, 
          getSubscriptionsRequest, updateSubscriptionRequest, resetUpdateSubscriptions, deleteRecurrencyRequest, changeCardRequest} from '../../store/actions/clinics.actions';
import { lastCanceledRecurrency } from '../../services/clinic';
import  ModalPaidSubscriptions  from '../clinics/modal-paid-subscriptions';
import swal from 'sweetalert2';
import Select from 'react-select';
import { Input } from 'antd';
import moment from 'moment';
import { toast } from 'react-toastify';
import { getUserIdAdminFromClinic } from '../../services/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getUsersClinicRequest } from '../../store/actions/clinics.actions';


export default function ClinicEditing({ match, history }) {
  const dispatch = useDispatch();
  const clinics = useSelector(state => state.clinics);
  const clinicsSubscriton = useSelector(state => state.clinics.subscriptions_clinics);
  const clinicWim = useSelector(state => state.clinics.clinicWim);
  const errorType = useSelector(state => state.clinics.updateSubscription);
  const userClinics = useSelector(state => state.clinics.usersFromClinic);
  const [clinicEditing, setClinicEditing] = useState('');
  const [subscription, setSubscriptions] = useState({});
  const [wimPlans, setWimPlans] = useState(undefined);
  const [options, setOptions] = useState([]);
  const [optionsPlans] = useState([
    {label: "Mensal", value: 1},
    {label: "Trimestral", value: 3}, 
    {label: "Semestral", value: 6}, 
    {label: "Anual", value: 12}]);
  const [planSelected, setPlanSelected] = useState('');
  const [months, setMonths] = useState('');
  const [additionalDisk, setAdditionalDisk] = useState(0);
  const [additionalSms, setAdditionalSms] = useState(0);
  const [additionalUsers, setAdditionalUsers] = useState(0);
  const [free_additional_users, setAdditionalFreeUsers] = useState(0);
  const [p_cpf_cobranca, setCpf] = useState('');
  const [p_cnpj_cobranca, setCnpj] = useState('');
  const [reload, setReload] = useState(false);
  const [recurrency, setRecurrency] = useState({});
  const [lastRecurrency, setLastRecurrency] = useState([]);
  const [isVisibleUser, setIsVisibleUser] = useState(false);
  const [isVisibleSubscription, setIsVisibleSubscription] = useState(false);
  const [userId, setUserId] = useState(0);
  const { Option } = SelectAntd;
  
  
  

  useEffect(() => {
    dispatch(getClinicWimRequest(match.params.id));
    dispatch(getSubscriptionsRequest(match.params.id));
    dispatch(getUsersClinicRequest(match.params.id));
  }, []);

  useEffect(()=>{
    if(clinicWim !== undefined && clinicWim.clinic !== undefined && clinicWim.clinic[0] !== undefined){
      setCpf(clinicWim.clinic[0].p_cpf_cobranca)
      setCnpj(clinicWim.clinic[0].p_cnpj_cobranca)
    }
  }, [clinicWim])

  useEffect(() => {
    setClinicEditing(clinics.clinicWim);
    if(clinicsSubscriton !== undefined && clinicsSubscriton.data !== undefined && reload === false && clinics.clinicWim !== undefined){
      setSubscriptions(clinicsSubscriton.data.subscription[0]);
      setWimPlans(clinicsSubscriton.data.wimPlans);
      setPlanSelected({value: clinicsSubscriton.data.subscription[0].wim_plan_id, label: clinicsSubscriton.data.subscription[0].description});
      setAdditionalDisk(clinicsSubscriton.data.subscription[0].additional_disk_space_gb);
      setAdditionalSms(clinicsSubscriton.data.subscription[0].additional_sms);
      setAdditionalUsers(clinicsSubscriton.data.subscription[0].additional_users);
      getMonths(clinicsSubscriton.data.subscription[0].months);
      setRecurrency(clinicsSubscriton.data.recurrency);
    }
    getOptions();

  }, [clinics, clinicsSubscriton, wimPlans, clinicWim]);

  useEffect(() =>{
    getLastRecurrency(match.params.id);
  }, [recurrency])

  async function getLastRecurrency(id){
    const lastRecurrency = await lastCanceledRecurrency(id);
    setLastRecurrency(lastRecurrency);
  }

  function handleSubmit(data) {
    let dataUpdate ={
      ...data,
      p_cpf_cobranca,
      p_cnpj_cobranca
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
        dispatch(updateClinicWimRequest(dataUpdate, match.params.id));
        setCpf(p_cpf_cobranca);
        setCnpj(p_cnpj_cobranca);
      }
    })
    
  }
  function handleSubmitSubscription(){
    const data = {wim_plan_id: planSelected.value, 
      additional_disk_space_gb: additionalDisk, 
      additional_sms: additionalSms,
      additional_users: additionalUsers,
      free_additional_users: parseInt(free_additional_users),   //ADICIONAIS GRÁTIS
      months: months.value,
      data_update: moment().format("YYYY-MM-DD")}
  
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
        setReload(true);
        dispatch(updateSubscriptionRequest(subscription.id,data, history));
          if(result.value){
            dispatch(getClinicWimRequest(match.params.id));
            dispatch(getSubscriptionsRequest(match.params.id));
            
          }else{
            history.push('/clinics-manage');
          }
        
      }
    })
    
  }

  useEffect(() => {
    if(errorType && errorType.error === false){
      toast.success(<div>Clínica atualizada com sucesso!<br /> Clique para listar clinicas!</div>, 
      {position: toast.POSITION.UPPER_RIGHT, onClick : () => history.push('/clinics-manage')});
      dispatch(resetUpdateSubscriptions());
    }else{
      if(errorType && errorType.error === true){
        toast.error('Falha ao atualizar!');
      }
    }
            
  }, [errorType]);

  function getOptions(){
    const array = [];
    if(wimPlans !== undefined){
      wimPlans.map((plans) =>{
        return array.push({value: plans.id, label: plans.description});
      })
      setOptions(array);
    }
  }

  function getMonths(value){
    switch(value){
      case 1:
        setMonths({label: "Mensal", value: value});
        return ;
      case 3:
        setMonths({label: "Trimestral", value: value});
        return ;
      case 6:
        setMonths({label: "Semestral", value: value});
        return ;
      case 12:
          setMonths({label: "Anual", value: value});
          return ;
      default:
        return 0;
    }
  }

  function mCPF(p_cpf_cobranca){
    p_cpf_cobranca=p_cpf_cobranca.replace(/\D/g,"")
    p_cpf_cobranca=p_cpf_cobranca.replace(/(\d{3})(\d)/,"$1.$2")
    p_cpf_cobranca=p_cpf_cobranca.replace(/(\d{3})(\d)/,"$1.$2")
    p_cpf_cobranca=p_cpf_cobranca.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
    setCpf(p_cpf_cobranca);
  }

  function mCNPJ(p_cnpj_cobranca) {
    p_cnpj_cobranca=p_cnpj_cobranca.replace(/\D/g,"")
    p_cnpj_cobranca=p_cnpj_cobranca.replace(/^(\d{2})(\d)/,"$1.$2")
    p_cnpj_cobranca=p_cnpj_cobranca.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
    p_cnpj_cobranca=p_cnpj_cobranca.replace(/\.(\d{3})(\d)/,".$1/$2")
    p_cnpj_cobranca=p_cnpj_cobranca.replace(/(\d{4})(\d)/,"$1-$2")
    setCnpj(p_cnpj_cobranca)
  }

  function release() {
    swal({
      title: 'Liberar Acesso',
      text: 'Deseja realmente liberar o acesso dessa clínica? A mesma terá acesso liberado por mais 7 dias!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Liberar!',
      closeOnConfirm: false,
      reverseButtons: true,
      preConfirm: () => {
        dispatch(releaseAccessRequest(match.params.id));
      },
    }).then((result) => {
      if (result.value) {
        swal(
          'Acesso Liberado!',
          'A clínica teve o acesso liberado por 7 dias a partir de hoje, recomende o pagamento o quanto antes!',
          'info'
        ).then(() => {
          history.push('/clinics-manage');
        });
      }
    })
  }

  function changeCard() {
    swal({
      title: 'Excluir Recorrência',
      text: 'Deseja realmente excluir esta recorrência e permitir o cadastro de um novo cartão?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Excluir!',
      closeOnConfirm: false,
      reverseButtons: true,
    }).then((result) => {
      if(result.value){
        dispatch(changeCardRequest(clinicsSubscriton.data.subscription[0].id));
        setTimeout(()=>{
          dispatch(getSubscriptionsRequest(match.params.id));
        },500)
      }
    })
  }

  function excludeRecurrency(){
    swal({
      title: 'Excluir Recorrência',
      text: 'Deseja realmente excluir a recorrência desta clínica?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Excluir!',
      closeOnConfirm: false,
      reverseButtons: true,
    }).then((result) => {
      if(result.value){
        dispatch(deleteRecurrencyRequest(clinicsSubscriton.data.subscription[0].id));
        setTimeout(()=>{
          dispatch(getSubscriptionsRequest(match.params.id));
        },500)
      }
    })
  }

  async function getUserAdmAndPush(id){
    const superId = await getUserIdAdminFromClinic(id);
    history.push(`/user-editing/${superId}`)
  }

  function closeModalSubscription(){
    setIsVisibleSubscription(false)
  }
  

  return (
    <Fragment>
      <Card 
        title={
          <Row>
            <Icon type="user" style={{fontSize: '20px', marginRight: '5px'}}/><span style = {{fontSize : '20px'}}>Editar Clínica</span>
            
            <Button
              className="btn btn-att"
              style = {{float: 'right', marginLeft: '25px'}}
              onClick = {() => setIsVisibleSubscription(true)}
            >
              Ver Pagamentos
            </Button>

            <SelectAntd 
              style={{ width: '14rem', float:'right'}}
              allowClear
              placeholder="Selecione um usuário"

            >
              {

                userClinics && 
                userClinics.map(allUsersClinic => (
                  <Option
                    onClick={(e) => (setIsVisibleUser(true), setUserId(e.key))}
                    value={allUsersClinic.id}
                  > {allUsersClinic.name}
                  </Option>
                ))
              }
            </SelectAntd>

          </Row>
         }
         >

        <Row style={{display: 'flex', justifyContent: 'center', padding: '0 0 1rem 0'}}>
          <h2>
            Dados da Clínica
          </h2>
        </Row>

        <Form className="form-users" onSubmit={handleSubmit} initialData={clinicEditing.clinic ? clinicEditing.clinic[0] : ''}>
          <Row gutter={150} justify="center" type='flex'>
            <Col span={9}>
              <InputUnform contentLabel={'Clínica:'} nameInput={'name'}></InputUnform>
            </Col>
            <Col style={{marginTop: '-15px', marginBottom: '15px'}} span={9}>
            <label  className="label-contentLabel2" style={{ float: "left" }}>CNPJ:</label>
              <Input onChange={(e) => mCNPJ(e.target.value)} value={p_cnpj_cobranca} placeholder={"00.000.000/0000-00"} maxLength={18} className="register-called"/>
            </Col>
            <Col span={9}>
              <InputUnform contentLabel={'Proprietário:'} nameInput={'p_nome_cobranca'}></InputUnform>
            </Col>
            <Col style={{marginTop: '-15px', marginBottom: '15px'}} span={9}>
            <label  className="label-contentLabel2" style={{ float: "left" }}>CPF:</label>
              <Input onChange={(e) => mCPF(e.target.value)} value={p_cpf_cobranca} placeholder={"000.000.000-00"} maxLength={14} className="register-called"/>
            </Col>
            <Col style={{ marginBottom: '20px' }} span={9}>
              <InputUnform contentLabel={'Estado:'} nameInput={'name_state'} disabled></InputUnform>
            </Col>
            <Col style={{ marginBottom: '20px' }} span={9}>
              <InputUnform contentLabel={'Cidade:'} nameInput={'name_city'} disabled></InputUnform>
            </Col>
            <Col style={{ marginBottom: '20px' }} span={9}>
              <InputUnform contentLabel={'Endereço:'} nameInput={'street'} disabled></InputUnform>
            </Col>
            <Col style={{ marginBottom: '20px' }} span={9}>
              <InputUnform contentLabel={'CEP:'} nameInput={'zipcode'} disabled></InputUnform>
            </Col>
            <Col style={{ marginBottom: '20px', color: "#545454" }} span={9}>
              <InputUnform contentLabel={'Bairro:'} nameInput={'neighborhood'} disabled></InputUnform>
            </Col>
            <Col style={{ marginBottom: '20px' }} span={9}>
              <InputUnform contentLabel={'Número:'} nameInput={'number'} disabled></InputUnform>
            </Col>
          </Row>
          <Row gutter={150} justify="center" type='flex'>
            <Col span={9} style={{marginBottom:"18px"}}>
              <label className="label-contentLabel2">Plano</label>
              <Select
                placeholder={'Plano'}
                value={planSelected}
                options={options}
                isDisabled={localStorage.getItem('@permission') === 'developer' ? false : true}
                className="react-select"
                onChange={(option) => {setPlanSelected(option);}}
              />
            </Col>
            <Col span={9} style={{marginBottom:"18px"}}>
              <label className="label-contentLabel2">Período</label>
              <Select
                placeholder={'Período'}
                value={months}
                options={optionsPlans}
                isDisabled={localStorage.getItem('@permission') === 'developer' ? false : true}
                className="react-select"
                onChange={(option) => {setMonths(option);}}
              />
            </Col>

          </Row>

            <div className="boxButtonsClinic" style={{padding: '0 0 1rem 0'}}>
              <Tooltip title="A Clínica receberá acesso por 7 dias">
                <Button onClick={release} className="btn ant-btn-primary" style={{marginLeft: '25px', marginTop:'0px'}}><Icon type="unlock" />Liberar acesso</Button>
              </Tooltip>
              <Button className="btn-att" htmlType="submit" style={{marginLeft:'25px'}}><Icon type="save"/>Atualizar Clínica</Button>
              <Button onClick={ () => getUserAdmAndPush(match.params.id)} className="btn ant-btn-primary" style={{marginLeft: '25px', marginTop:'0px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Usuário Administrador
              <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '10px'}} /> </Button>
            </div>

            <br/>
            <Divider />
            <br/>

            <section>
              <Row style={{display: 'flex', justifyContent: 'center', padding: '0 0 2rem 0'}}>
                <h2>
                  Dados Adicionais
                </h2>
              </Row>

              <Row gutter={150} style={{display: 'flex', justifyContent: 'center'}}>
                {
                  recurrency !== undefined && recurrency !== null && Object.keys(recurrency).length &&
                  <>
                    <Col style={{marginTop: '-20px', marginBottom: '15px'}} span={9}>
                      <label  className="label-contentLabelSubscription" style={{ float: "left" }}>ID Pagamento:</label>
                      <Input  disabled value={recurrency.recurrent_payment_id} maxLength={30} className="recurrent-input"/>
                    </Col>

                    <Col style={{marginTop: '-20px', marginBottom: '20px'}} span={9}>
                      <label  className="label-contentLabelSubscription" style={{ float: "left" }}>Intervalo:</label>
                      <Input  disabled value={recurrency.interval.charAt(0).toUpperCase()+recurrency.interval.slice(1)} maxLength={18} className="recurrent-input"/>
                    </Col>
                  </>
                }
              </Row>
            </section>

          
          <Row gutter={20} justify="center" type='flex'>
            <Col span={4}>
              <center><label className="label-contentLabelSubscription">Usuários Adicionais</label></center> 
              <Input className="register-called" placeholder="Digite a quantidade" value={additionalUsers} onChange={(e) => setAdditionalUsers(e.target.value)} disabled={localStorage.getItem('@permission') === 'developer' ? false : true}/>
            </Col>
            <Col span={4}>
              <center><label className="label-contentLabelSubscription">SMS Adicional</label></center> 
              <Input className="register-called" placeholder="Digite a quantidade" value={additionalSms} onChange={(e) => setAdditionalSms(e.target.value)} disabled={localStorage.getItem('@permission') === 'developer' ? false : true}/>
            </Col>
            <Col span={4}>
              <center><label className="label-contentLabelSubscription">Espaço adicional (GB)</label></center> 
              <Input className="register-called" placeholder="Digite a quantidade" value={additionalDisk} onChange={(e) => setAdditionalDisk(e.target.value)} disabled={localStorage.getItem('@permission') === 'developer' ? false : true}/>
            </Col>
            <Col span={4}>
              <center><label className="label-contentLabelSubscription">Usuários Adicionais Grátis</label></center> 
              <Input className="register-called" placeholder="Digite a quantidade" value={free_additional_users} onChange={(e) => setAdditionalFreeUsers(e.target.value)} disabled={localStorage.getItem('@permission') === 'developer' ? false : true}/>
            </Col>
          </Row>
          
          <div className="boxButtonsClinic">
            {localStorage.getItem('@permission') === 'developer' && 
              <Button className="btn-attSubscription"  style={{marginLeft:'25px'}} onClick={() => handleSubmitSubscription()}><Icon type="save" />Atualizar Adicionais</Button>
            }

            {localStorage.getItem('@permission') === 'developer' && recurrency && lastRecurrency && lastRecurrency.recurrent_payment_id === null && lastRecurrency.description === 'Troca de Cartão' &&
              <Button className="btn btn-warning" style={{marginLeft:'25px', backgroundColor: '#FF4D4F', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={() => changeCard()}><Icon type="retweet" style={{ fontSize: '18px', display: 'flex', marginTop: '2px'}}/>Trocar Cartão</Button>
            }
            {localStorage.getItem('@permission') === 'developer' && recurrency  && 
              <Button className="btn" style={{marginLeft:'25px', backgroundColor: '#FF4D4F', color: 'white'}} onClick={() => excludeRecurrency()}><Icon type="close" />Cancelar Recorrência</Button>
            }
          </div>

        </Form>
      </Card>

      <Modal 
        title={"Usuário Selecionado:"} 
        visible={isVisibleUser} 
        centered={true} 
        onOk={() => setIsVisibleUser(false)} 
        onCancel={() => setIsVisibleUser(false)} 
        width={950}
        cancelText="Cancelar"
        okText="Confirmar"
        footer={[
        <div
          style={{
            display:'flex',
            justifyContent:'center'
          }}
        >
           <Button onClick={() => setIsVisibleUser(false)}
            style={{color:'white', 
                    backgroundColor:'black',
                    
                    }}
           >Fechar</Button>
        </div>
        ]}
      >
        <UserEditing isModal id={userId}/>
      </Modal>

      <ModalPaidSubscriptions
        modalSubscriptions = {isVisibleSubscription}
        onOk = {closeModalSubscription}
        id = {match.params.id}
      />

    </Fragment>
    
  );
}
