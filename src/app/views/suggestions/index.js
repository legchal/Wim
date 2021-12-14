import React, { useEffect, useState, Fragment } from 'react';
import { Card, Row, Button, DatePicker, Tooltip, Icon} from 'antd';
import { faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from '../../components/DataTable';
import moment from 'moment';
import { getSuggestions, getSuggestionsFromDates } from '../../services/suggestion';
import ModalSuggestion from '../suggestions/modalSuggestion';
import './styles.css';


export default function Suggestions(){ 
  
  const [dataSource, setDataSource] = useState([]);
  const [rowModal, setRowModal] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading,] = useState(false);

  const { RangePicker } = DatePicker;

  useEffect(() => {
    Suggestions();
  }, [])

  const Suggestions = async () => {
    const {data} = await getSuggestions();
    setDataSource(data.suggestions);
  }

  function onOk() {
    setModalVisible(false);
  }
  async function onChangePicker(values) {
    if(values.length !== 0) {
      const { data } = await getSuggestionsFromDates(values[0].format('YYYY-MM-DD'), values[1].format('YYYY-MM-DD'));
      setDataSource(data.suggestions);
    }
  }

  function getColumns(){
    const columns = [
      {

        title: 'Clínica',
        dataIndex: 'clinic_id',
        key: 'Clínica',
        defaultSortOrder: 'ascend',        
        align: 'center',
      },
      {
        title: 'Nome da clínica',
        dataIndex: 'Clinic.fantasy_name',
        key: 'Nome',
        defaultSortOrder: 'ascend',        
        align: 'center',
      },
      {
        title: 'Tipo',
        dataIndex: 'type',
        key: 'type',
        filters: [
          { text: 'Dashboard', value: 'Dashboard'},
          { text: 'Agenda', value: 'Agenda'},
          { text: 'Pacientes', value: 'Pacientes'},
          { text: 'Financeiro', value: 'Financeiro'},
          { text: 'Administrativo', value: 'Administrativo'},
          { text: 'Estoque', value: 'Estoque'},
          { text: 'Relatórios', value: 'Relatório'},
          { text: 'Prontuário', value: 'Prontuário'},
          { text: 'Outros', value: 'Outros'},       
        ],
        onFilter: (value,record) => record.type !== null && record.type.indexOf(value) === 0,
        render: (text, row) =>{
          switch(row.type){
            case 'Dashboard':
              return 'Dashboard';
            case 'Agenda':
              return 'Agenda';
            case 'Pacientes':
              return 'Pacientes';
            case 'Financeiro':
              return 'Financeiro';
            case 'Administrativo':
              return 'Administrativo';
            case 'Estoque':
              return 'Estoque';
            case 'Relatórios':
              return 'Relatórios';
            case 'Prontuário':
              return 'Prontuário';
            case 'Outros':
              return 'Outros';
            default: 
              return 'Outros';
          }
        },
        align: 'center',
      },
      {
        title: 'Data da Sugestão',
        render: (row) => {
          return ( 
            moment(row.created_at).format('DD/MM/YYYY')
          );
        },
        align: 'center'
      },
      {
        title: 'Ações',
        render: ( row ) => [
          <Fragment>
            <Tooltip placement="top" title='Detalhes'>
              <Button size="small" htmlType="button" className="btn ant-btn-primary" onClick={() => {
                setRowModal(row);
                setModalVisible(true);
              }}>
                <Icon type="eye" />
              </Button>
            </Tooltip>  
          </Fragment>
        ],
        align: 'center'
      }
    ]
    
    return columns;
  }
  return(
    <Fragment>      
      <Card
      title={
        <Row>
          <FontAwesomeIcon icon={faEnvelopeOpen} style={{fontSize:'20px'}}/><span className="titleSuggestions"> Sugestões </span>
        </Row>
      }
      >
        <center>
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

        <br></br>
        <DataTable
          Datasource={dataSource}
          Columns={getColumns()}
          Loading={loading}
          Placeholder="Procure pelo Tipo"
          suggestionsSource={dataSource}
        /> 
      </Card>   

      <ModalSuggestion row={rowModal} modalVisible ={modalVisible}  onOK={onOk} getSuggestions={ () => Suggestions()} />   
    </Fragment>
  )
}