import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Col, Button, Icon, Radio, Tooltip} from 'antd';
import DataTable from '../../components/DataTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import UsersFromClinicModal from './users-from-clinic';
import ModalPaidSubscriptions from './modal-paid-subscriptions';
import swal from 'sweetalert2';
import { destroyClinicRequest, getAllStatesRequest, verifyPasswordRequest, clearVerify } from '../../store/actions/clinics.actions';
import { toast } from 'react-toastify';
import "./style.css";


export default function UsersList({ history }) {
  const dispatch = useDispatch();
  const clinics = useSelector(state => state.clinics);
  const [dataSource, setDataSource] = useState([]);
  const [loading,] = useState(false);
  const [situationFilter, setSituationFilter] = useState('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [clinicId, setClinicId] = useState('');
  const [idExclude, setIdExclude] = useState(false);
  const [modalSubscriptions, setModalSubscriptions] = useState(false);

  useEffect(() => {
    dispatch(getAllStatesRequest());
  }, []);

  useEffect(() => {
    if (situationFilter === 'all') {
    setDataSource(clinics.allStates);
    } else if (situationFilter === 'actives') {
      setDataSource(clinics.allClinics);
    } else if (situationFilter ==='realActives') {
      setDataSource(clinics.realActives);
    } else {
      setDataSource(clinics.allClinicsInactive);
    }
  }, [clinics]);

  useEffect(() => {
      if(clinics.verification === 'Incorrect Password'){
        swal(
          'Senha Incorreta!',
          'A senha digitada está incorreta! Verifique e tente novamente!',
          'error'
        );
        dispatch(clearVerify());        
      }else if(clinics.verification === 'Correct Password'){
        swal({
          title: 'Senha Verificada!',
          text: 'Deseja realmente excluir essa clínica? Essa ação é irreversivél!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim, Excluir!',
          cancelButtonText: 'Cancelar', 
          closeOnConfirm: false,
          preConfirm: () => {
            dispatch(destroyClinicRequest(idExclude));
          },
        }).then((result) => {
          if(result.value){
            dispatch(getAllStatesRequest());
            history.push('/clinics-manage');
            toast.success('Clínica excluída com sucesso !')
            dispatch(clearVerify());
          }
        })
        
      }
  }, [clinics.verification])


  function setValueRadio(e) {
    setSituationFilter(e.target.value);

    if(e.target.value === 'all') {
      setDataSource(clinics.allStates);
    } else if(e.target.value === 'actives') {
      setDataSource(clinics.allClinics);
    } else if(e.target.value === 'realActives') {
      setDataSource(clinics.realActives);
    } else {
      setDataSource(clinics.allClinicsInactive);
    }
  }

  function onOk() {
    setModalVisible(false);
    setModalSubscriptions(false);
  }


 function excluirClinica(id) {
  setIdExclude(id);
  swal.fire({
    title: 'Atenção',
    text: 'Digite sua senha para continuar!',
    showCancelButton: true,
    showConfirmButton: true,
    showLoaderOnConfirm: true,
    type: 'warning',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',    
    input: 'password',
    inputPlaceholder: `Digite sua senha.`,
    inputAttributes: {
      autocapitalize: 'off'
    },
    confirmButtonText: 'Continuar',
    cancelButtonText: 'Cancelar',
    preConfirm: (login) => {
      dispatch(verifyPasswordRequest(login));
    },
  }).then((result) => {
  })
 }

  function getColumns() {
    const columns = [
      {
        title: 'Clínica',
        dataIndex: 'name',
        key: 'name',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => {return a.name.localeCompare(b.name)},
        width: '15%',
      }, 
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: '5%',
      },
      {
        title: 'CNPJ',
        key: 'p_cnpj_cobranca',
        width: '14%', 
        render: row => {
          return row && row.p_cnpj_cobranca ? row.p_cnpj_cobranca : 'Não informado';
        }
      },
      {
        title: 'Proprietário',
        dataIndex: 'p_nome_cobranca',
        key: 'p_nome_cobranca',
        width: '18%',
      },
      {
        title: 'Pagante',
        dataIndex: 'is_free_trial_subscription',
        filters: [
          { text: 'Pagantes', value: false},
          { text: 'Não Pagantes', value: true}
        ],
        onFilter: (value, record) => record.is_free_trial_subscription != null && record.is_free_trial_subscription === value && value === false ? record.interval != null : 
        value === true && record.interval === null,
        render: (naoRemova, record) => {
            return (
              !record.is_free_trial_subscription && record.interval != null ?
                <div className="is-paying-true status"/>
              : 
                <div className="is-paying-false status"/>
            );
        },
        width: '5%'
      },

      {  
        title: 'Mensalidade',
        dataIndex: 'interval',
        filters: [
          { text: 'mensal', value: 'mensal'}, 
          { text: 'semestral', value: 'semestral' }, 
          { text: 'anual', value: 'anual'},
          
        ],
        onFilter: (value, record) => record.interval !== null && record.interval.indexOf(value) === 0,
        render: (text, row) => {
        
            if(row.interval === 'mensal'){
              return 'Mensal';
            }
            if(row.interval === 'semestral'){
              return 'Semestral';
            }
            if(row.interval === 'anual'){
              return 'Anual';
            }
            if (row.interval === null && row.is_free_trial_subscription){
              return 'Sem recorrências (Trial)';
            }
            if (row.interval === null && !row.is_free_trial_subscription){
              return 'Sem recorrências (Alterado)';
            }
            if (row.interval === null){
              return 'Sem recorrências';
            }          
        },
        width: '10%',
      },
      {
        title: 'Plano',
        dataIndex: 'plan_description',
        key: 'plan_description',
        filters: [
          { text: 'Plano Básico', value: 'Plano Básico'},
          { text: 'Plano Plus', value: 'Plano Plus'},
          { text: 'Plano Premium', value: 'Plano Premium'},
          { text: 'Plano DMM', value: 'Plano DMM'},
          { text: 'Plano Premium Desconto Neab', value: 'Plano Premium Desconto Neab'},
          { text: 'Plano Premium Desconto CIOSP 2020', value: 'Plano Premium Desconto CIOSP 2020'},
          { text: 'Plano Premium CIOSP 2020', value: 'Plano Premium CIOSP 2020'},
          { text: 'Plano Plus CIOSP 2020 + 20% de desconto', value: 'Plano Plus CIOSP 2020 + 20% de desconto'},
          { text: 'Plano Premium CIOSP 2020 + 20% de desconto', value: 'Plano Premium CIOSP 2020 + 20% de desconto'},
          { text: 'Plus c/ desconto especial de 30% DMM', value: 'Plano Plus com desconto especial de 30% para clientes DMM'},
          { text: 'Premium c/ desconto especial de 30% DMM', value: 'Plano Premium com desconto especial de 30% para clientes DMM'},
          { text: 'Plano Premium 40% desconto', value: 'Plano Premium 40% desconto'},
          { text: 'Auxiliar para testar recorrencias', value: 'Auxiliar para testar recorrencias'}

        ],
        onFilter: (value,record) => record.plan_description !== null && record.plan_description.indexOf(value) === 0,
        render: (text, row) =>{
          switch(row.plan_description){
            case 'Plano Básico':
              return 'Plano Básico';
            case 'Plano Plus':
              return 'Plano Plus';
            case 'Plano Premium':
              return 'Plano Premium';
            case 'Plano DMM':
              return 'Plano DMM';
            case 'Plano Premium Desconto Neab':
              return 'Plano Premium Desconto Neab';
            case 'Plano Premium Desconto CIOSP 2020':
              return 'Plano Premium Desconto CIOSP 2020';
            case 'Plano Premium CIOSP 2020':
              return 'Plano Premium CIOSP 2020';
            case 'Plano Plus CIOSP 2020 + 20% de desconto':
              return 'Plano Plus CIOSP 2020 + 20% de desconto';
            case 'Plano Premium CIOSP 2020 + 20% de desconto':
              return 'Plano Premium CIOSP 2020 + 20% de desconto';
            case 'Plano Plus com desconto especial de 30% para clientes DMM':
              return 'Plus c/ desconto especial de 30% DMM';
            case 'Plano Premium com desconto especial de 30% para clientes DMM':
              return 'Premium c/ desconto especial de 30% DMM';
            case 'Plano Premium 40% desconto':
              return 'Plano Premium 40% desconto';
            case 'Auxiliar para testar recorrencias':
              return 'Auxiliar para testar recorrencias';
            default: 
              return 'Sem Descrição';
          }
        },
        width: '10%',
      },
      {
        title: 'Ações',
        render: (cell, row, index) => [
          <Fragment>
            <Tooltip placement="top" title='Editar Clínica'>
              <Button size="small" htmlType="button" className="btn color-btn-editing" onClick={() => {
                history.push(`clinic-editing/${row.id}`);
              }}>
                <Icon type="edit" />
              </Button>
            </Tooltip>
            &nbsp;
            <Tooltip placement="top" title={'Listar Usuários da Clínica'}>
              <Button size="small" htmlType="button" className="btn ant-btn-primary" onClick={() => {
                setClinicId(row.id);
                setModalVisible(true);
              }}>
                <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
              </Button>
            </Tooltip>
            &nbsp;
            {localStorage.getItem('@permission') === 'developer' &&
              <>
                <Tooltip placement="top" title="Pagamentos">
                  <Button size="small"  id="btn-paid-subscriptions"
                  className="btn color-btn-primary" htmlType="button" 
                  onClick={() => {
                    setClinicId(row.id);
                    setModalSubscriptions(true);
                  }}>
                    <FontAwesomeIcon style={{color: 'white' }} icon={faDollarSign}></FontAwesomeIcon>
                  </Button>
                </Tooltip>
            
                &nbsp;
                <Tooltip placement="top" title="Excluir Clínica">
                    <Button type="danger" htmlType="button" size="small" onClick={() => {
                      excluirClinica(row.id);
                    }}>
                      <Icon type="close" />
                    </Button>
                </Tooltip>
              </>
            }            
          </Fragment>
        ],
        width: '17%'
      }
    ];
    return columns;
  }

  return (
    <Fragment>
      <Card
        title={
          <Row>
            {situationFilter === 'all' && 
            <Fragment>
              <Icon  type="home" style = {{fontSize :'20px'}}/> <span style = {{fontSize : '20px'}}>Todas as Clínicas</span>
              <Col md={{ span: 6 }} sm={{ span: 12 }} lg={{ span: 6 }} className="card-position">
                <div className="card-clinics card-clinics-manage">
                  <div className="card-clinics-header ">Total:&nbsp;{
                    dataSource.length
                  }&nbsp;clínicas</div>
                </div>
              </Col>
            </Fragment>
            }
            {
              situationFilter === 'inactives' && 
              <Fragment>
                <Icon  type="home" style = {{fontSize :'20px'}}/> <span style = {{fontSize : '20px'}}> Clínicas Inativas </span>
              <Col md={{ span: 6 }} sm={{ span: 12 }} lg={{ span: 6 }} className="card-position">
                <div className="card-clinics card-clinics-inactives">
                  <div className="card-clinics-header ">Total:&nbsp;{
                    dataSource.length
                  }&nbsp;clínicas</div>
                </div>
              </Col>
            </Fragment>
            }
            {
              situationFilter === 'actives' && 
              <Fragment>
                <Icon  type="home" style = {{fontSize :'20px'}}/> <span style = {{fontSize : '20px'}}> Clínicas Ativas </span>
              <Col md={{ span: 6 }} sm={{ span: 12 }} lg={{ span: 6 }} className="card-position">
                <div className="card-clinics card-clinics-atives">
                  <div className="card-clinics-header ">Total:&nbsp;{
                    dataSource.length
                  }&nbsp;clínicas</div>
                </div>
              </Col>
            </Fragment>
            }
            {
              situationFilter === 'realActives' && 
              <Fragment>
                <Icon  type="home" style = {{fontSize :'20px'}}/> <span style = {{fontSize : '20px'}}> Clínicas Reais </span>
              <Col md={{ span: 6 }} sm={{ span: 12 }} lg={{ span: 6 }} className="card-position">
                <div className="card-clinics card-clinics-atives">
                  <div className="card-clinics-header ">Total:&nbsp;{
                    dataSource.length
                  }&nbsp;clínicas</div>
                </div>
              </Col>
            </Fragment>
            }
            
            
          </Row>
        }
      >
          <center>
            <Radio.Group value={situationFilter} buttonStyle="solid" onChange={setValueRadio}>   
              <Radio.Button value="all">Todas as Clínicas </Radio.Button>
              <Radio.Button value="actives"> Clínicas Ativas </Radio.Button>
              <Radio.Button value="realActives">Clínicas Ativas Reais</Radio.Button>
              <Radio.Button value="inactives"> Clínicas Inativas </Radio.Button>
            </Radio.Group>
          </center>
          <br />
        <DataTable 
          Datasource={dataSource}
          Loading={loading}
          Columns={getColumns()}
          Placeholder="Pesquise pelo Nome ou ID da Clínica"
        /> 
        <UsersFromClinicModal id={clinicId} history={history} visible={modalVisible} onOk={onOk}/>
        <ModalPaidSubscriptions id={clinicId} modalSubscriptions={modalSubscriptions} onOk={onOk} />
      </Card>
    </Fragment>
  );
}