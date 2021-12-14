import React, { useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, DatePicker, Icon, Button, Tooltip} from 'antd';
import DataTable from '../../components/DataTable';
import { Loader2 } from '../../components/Loader';
import moment from 'moment';
import {getRegisterLogRequest} from '../../store/actions/log.actions';
import ModalRegisterLogs from './modal-registerLogs';


export default function RegisterLogs({ history }) {
  const dispatch = useDispatch();
  const RegisterLogs = useSelector(state => state.log.registerLogs);

  const [dataSource, setDataSource] = useState([]);
  const [loading] = useState(false);
  const [modalDetails, setModalDetails] = useState(false);
  const [rowModal, setRowModal] = useState('');
  const [typeModal, setTypeModal] = useState('');

  
  const { RangePicker } = DatePicker;

  function getType(type){
    switch(type){
      case 'Create_Called':
        return 'Chamado Cadastrado';
      case 'Update_Called':
        return 'Alteração no Chamado';
      case 'Resolve_Called':
        return 'Chamado Resolvido';
      case 'Attended_Called':
        return 'Chamado Atendido';
      case 'Clinic_Update_Register':
        return 'Atualização no Cadastro da Clínica';
      case 'Clinic_Delete':
        return 'Exclusão de Clínica';
      case 'Clinic_Update_End_Subscription':
        return 'Alteração Data Final Acesso Clínica';
      case 'Clinic_Update_Subscription':
        return 'Atualização de Registro da Clínica';
      case 'Clinic_Add_7_Days':
        return 'Liberado 7 dias';
      case 'Salesman_Register':
        return 'Cadastro de Vendedor';
      case 'Ticket_Read':
        return 'Ticket Copiado'
      case 'Create_User_Adm':
        return 'Criou Usuário ADM'
      case 'Update_User_Adm':
        return 'Alterou Usuário ADM';
      case 'Delete_User_Adm':
        return 'Deletou Usuário ADM';
      case 'User_Clinic_Update':
        return 'Cadastro de Usuário Alterado';
      case 'User_Clinic_Reset_Password':
        return 'Redefiniu Senha de Usuário'
      case 'CreateRevenue_CashFlow' :
        return 'Cadastro de Receita';
      case 'CreateExpenditure_CashFlow':
        return 'Cadastro de Despesa';
      case 'Payment_CashFlow':
        return 'Pagamento de Despesa';
      case 'Edit_CashFlow':
        return 'Atualização no Fluxo de Caixa';
      case 'Destroy_CashFlow':
        return 'Exclusão no Fluxo de Caixa';
      case 'Clinic_Delete_Recurrency':
        return 'Exclusão Recorrência Clinica';
      case 'Clinic_Update_End_paidSubscription':
        return 'Alteração Data Final Acesso Clínica';
      case 'Clinic_Change_Card':
        return 'Troca de Cartão';
      case 'Alter_Plan':
        return 'Troca de Plano'
      default:
        return '- - - - -'
    }
  }

  function getColumns() {
    const columns = [
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'nome',
        align: 'left',
      },
      {
        title: 'Nome Fantasia (Clínica)',
        align: 'left',
        render: (row) => {
          return row && row.fantasy_name ? row.fantasy_name : '- - - - - -';
        },
      },
      {
        title: 'Tipo',
        align: 'left',
        dataIndex: 'type',
        filters: [
          { text: 'Alteração Data Final Acesso Clínica', value: 'Clinic_Update_End_paidSubscription'},
          { text: 'Alteração no chamado', value: 'Update_Called'},
          { text: 'Alterou Usuário ADM', value: 'Update_User_Adm'},
          { text: 'Atualização no Cadastro da Clínica', value: 'Clinic_Update'},
          { text: 'Atualização no Fluxo de Caixa', value: 'Edit_CashFlow'},
          { text: 'Atualização no Registro da Clínica', value: 'Clinic_Update_Subscription'},
          { text: 'Cadastro de Despesas', value: 'CreateExpenditure_CashFlow'},
          { text: 'Cadastro de Receitas', value: 'CreateRevenue_CashFlow'},
          { text: 'Cadastro de Vendedor', value: 'Salesman_Register'},
          { text: 'Cadastro de Usuário Alterado', value: 'User_Clinic_Update'},
          { text: 'Chamado Atendido', value: 'Attended_Called'},
          { text: 'Chamado Resolvido', value: 'Resolve_Called'},
          { text: 'Chamado Cadastrado', value: 'Create_Called'},
          { text: 'Criou Usuário ADM', value: 'Create_User_Adm'},
          { text: 'Deletou Usuário ADM', value: 'Delete_User_Adm'},
          { text: 'Exclusão de Clínica', value: 'Clinic_Delete'},
          { text: 'Exclusão no Fluxo de Caixa', value: 'Destroy_CashFlow'},
          { text: 'Pagamento de Despesa', value: 'Payment_CashFlow'},
          { text: 'Liberado 7 dias', value: 'Clinic_Add_7_Days'},
          { text: 'Redefiniu Senha de Usuário', value: 'User_Clinic_Reset_Password'},
          { text: 'Ticket Copiado', value: 'Ticket_Read'},
          { text: 'Exclusão Recorrência Clinica', value: 'Clinic_Delete_Recurrency'},
          { text: 'Troca de Cartão', value: 'Clinic_Change_Card'},
          { text: 'Troca de Plano', value: 'Alter_Plan'}
        ],
        onFilter: (value, record) => record.type !== null && record.type.indexOf(value) === 0,
        render: (type) => {
          return type && getType(type);
        },
      },
      { 
        title: 'Data',
        render: (row) => {
          return ( 
            moment(row.created_at).format('DD/MM/YYYY - HH:mm')
          );
        },
        align: 'left'
      },
      {
        title: 'Ações',
        render: ( row ) => [
          <Fragment>
            <Tooltip placement="top" title='Detalhes'>
              <Button size="small" htmlType="button" className="btn color-btn-editing" onClick={() => {
                setModalDetails(true);
                setRowModal(row);
                setTypeModal(getType(row.type));
              }}>
                <Icon type="edit" />
              </Button>
            </Tooltip>  
          </Fragment>
        ],
        width: '16%',
        align: 'center'
      }
    ];
    return columns;
  }

  function onChangePicker(values) {
    if(values.length === 0) {
      dispatch(getRegisterLogRequest(
        moment().startOf('week').format('YYYY-MM-DD'), 
        moment().endOf('week').format('YYYY-MM-DD')));
        return;
    }
    dispatch(getRegisterLogRequest(
      values[0].format('YYYY-MM-DD'), values[1].format('YYYY-MM-DD'))
    );
  }

  useEffect(() => { 
    dispatch(getRegisterLogRequest(
      moment().startOf('week').format('YYYY-MM-DD'), 
      moment().endOf('week').format('YYYY-MM-DD')));
  },[]);

  useEffect(() => {
    if(RegisterLogs && RegisterLogs.data){
      setDataSource(RegisterLogs.data.registerLog);
    }
  },[RegisterLogs]);


  return (
    <Fragment>
      <Loader2 loading={loading} />
      <Card
      title={
        <Row>
          <Icon type="database" style={{fontSize:'20px'}}/> <span style={{fontSize:'20px'}}>Registros</span >
        </Row>
      }>
        <center style={{marginBottom:'20px'}}>
          <RangePicker
          ranges={{
            Today: [moment(), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
          }}
          separator="/"
          onChange={onChangePicker}
          format={"DD/MM/YYYY"}
          placeholder={["Início", "Fim"]}
          /> 
        </center>
        
        <DataTable 
          Placeholder={"Pesquise por Nome ou Clínica"}
          Datasource={dataSource}
          Loading={loading}
          Columns={getColumns()}
        />
      </Card>
      <center>
      <ModalRegisterLogs modalVisible={modalDetails} setmodalVisible={setModalDetails}  row={rowModal} onOk={() => setModalDetails(false)} type={typeModal}/>
      </center>
    </Fragment>
    
  );
} 