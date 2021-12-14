import React, { useState, useEffect, Fragment } from 'react';
import { Card, DatePicker, Tooltip, Button, Icon, Col, Row } from 'antd';
import DataTable from '../../components/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { allCalledRequest, allCalledOpenRequest } from '../../store/actions/called.actions';
import moment from 'moment';import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faList, faFileSignature} from '@fortawesome/free-solid-svg-icons';

export default function CalledList({ history }) {

  const [start, setStart] = useState(moment().startOf('month').format('YYYY-MM-DD'));
  const [end, setEnd] = useState(moment().endOf('month').format('YYYY-MM-DD'));

  const dispatch = useDispatch();
  const called = useSelector(state => state.called);
  const calledOpen = useSelector(state => state.called.allCalledOpen)
  const [dataSource, setDataSource] = useState([]);
  const { RangePicker } = DatePicker;
  
  useEffect(() => {
    dispatch(allCalledRequest(start, end));
  }, []);

  useEffect(() => {
    setDataSource(called.allCalleds);
  }, [called]);

  function onChangePicker(values) {
    if(values.length === 0) {
      dispatch(allCalledRequest(
        moment().startOf('month').format('YYYY-MM-DD'), 
        moment().endOf('month').format('YYYY-MM-DD')));
        return;
    }

    setStart(values[0]);
    setEnd(values[1]);
    dispatch(allCalledRequest(
      values[0].format('YYYY-MM-DD'), 
      values[1].format('YYYY-MM-DD'))
    );
  }

  function getColumns() {
    const columns = [{
      title: 'Número',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Suporte',
      dataIndex: 'userSupport.name' , 
      key: 'userSupport.name',
      filters: [
        { text: 'WIM Dental', value: 'WIM Dental'}, 
      ],
      onFilter: (value, record) => record.userSupport !== null && record.userSupport.name === value,
      render: (text, row) => {
        if(row.userSupport !== null && row.userSupport.name === 'WIM Dental'){  
          return 'WIM Dental';
        }else if(row.userSupport !== null){
          return row.userSupport.name;
        }else{
          return '-';
        }
      },
    },
    {
      title: 'Cliente',
      dataIndex: 'User.name' , 
      key: 'User.name'
    },
    {
      title: 'Email',
      dataIndex: 'User.email' , 
      key: 'user.email'
    },
    {
      title: 'Id Cliente',
      dataIndex: 'user_id_request' , 
      key: 'user_id_request'
    },
    {
      title: 'Criado em',
      render: row => {
        return moment(row.date).format('DD/MM/YYYY');
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
      filters: [
        { text: 'Pendente', value: 'pending',}, 
        { text: 'Aberto', value: 'open' }, 
        { text: 'Fechado', value: 'closed',}
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (text, row) => {
        if(row.status === 'pending'){
          return 'Pendente';
        }
        if(row.status === 'open'){
          return 'Aberto';
        }
        if(row.status === 'closed'){
          return 'Fechado';
        }
      }
    },
    {
      title: 'Resolvido em',
      render: row => {
        return row.date_solution ? moment(row.date_solution).format('DD/MM/YYYY') : '--/--/----';
      }
    },
    {
      title: 'Ações',
      render: (cell, row, index) => [
        <Tooltip title="Listar Detalhes">
          <Button className="btn ant-btn-primary" size="small" onClick={() => {
              history.push(`/called-details/${row.id}`);
            }}><Icon type="unordered-list" />
          </Button>
        </Tooltip>
      ]
    }]
    return columns;
  }
  
  return [
    <Fragment>
      <Card
        title={ 
          <Row>
            <Col md={{ span: 16 }} sm={{ span: 20 }} lg={{ span: 4 }} className="title-clinics" >
              <FontAwesomeIcon icon={faList}></FontAwesomeIcon>
              <span style={{fontSize:'20px', marginLeft:'5px'}}>Informações do Chamado</span >
            </Col>
            <Col md={{ span: 8 }} sm={{ span: 12 }} lg={{ span: 16 }} >
              <Tooltip title={"Listar todos os chamados abertos ou não resolvidos"}>
                <Button style={{float: 'right', marginRight:'10px'}} className="btn btn-warning" onClick={() => {
                  dispatch(allCalledOpenRequest())
                }}>
                <FontAwesomeIcon icon={faList}></FontAwesomeIcon>&nbsp;
                  Listar Chamados
                </Button>
              </Tooltip>
            </Col>
            <Col md={{ span: 6 }} sm={{ span: 6 }} lg={{ span: 4 }} >
              <Tooltip title={"Cadastrar um novo chamado"}>
                <Button className="btn btn-att " onClick={() => {
                  history.push('called-register');
                }}>
                <FontAwesomeIcon icon={faFileSignature}></FontAwesomeIcon>&nbsp;
                  Cadastrar Chamado
                </Button>
              </Tooltip>
            </Col>
           
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
          <br/>
        <DataTable 
          Loading={called.loading}
          Datasource={calledOpen.allCalledOpen ? calledOpen.allCalledOpen : dataSource.calleds}
          Columns={getColumns()}
          Placeholder="Procure por Nome, E-mail ou Número do Chamado"
          calledSource={dataSource.calleds}
        />
      </Card>
    </Fragment>
  ];
}
