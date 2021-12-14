/* eslint array-callback-return: 0 */ //--> OFF

import React, { useEffect, useState, Fragment } from 'react';
import DataTable from '../../components/DataTable';
import { getPaymentsPerDateRequest, getPrevisionNewClinicsRequest } from '../../store/actions/finance.actions';
import { useSelector, useDispatch } from 'react-redux';
import { Card, DatePicker, Col, Row, Tooltip, Icon } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

export default function RevenuesList({ history }) {
  const dispatch = useDispatch();
  const finance = useSelector(state => state.finance);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    dispatch(getPaymentsPerDateRequest(
      moment().startOf('month').format('YYYY-MM-DD'), 
      moment().endOf('month').format('YYYY-MM-DD')));
    
      dispatch(getPrevisionNewClinicsRequest());
  }, []);

  useEffect(() => {
    setDataSource(finance.allFinances);
  }, [finance]);

  function getColumns() {
    const columns = [{
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => {return a.name.localeCompare(b.name)}
    }, {
      title: 'Plano',
      dataIndex: 'plan_code',
      filters: [
        { text: 'PREMIUM', value: 'premium_plan_01',}, 
        { text: 'DMM', value: 'dmm_plan_01' }, 
        { text: 'PLUS', value: 'plus_plan_01',}
      ],
      onFilter: (value, record) => record.plan_code.indexOf(value) === 0,
      render: (text, row) => {
        if(row.plan_code === 'premium_plan_01'){
          return 'PREMIUM';
        }
        if(row.plan_code === 'dmm_plan_01'){
          return 'DMM';
        }
        if(row.plan_code === 'plus_plan_01'){
          return 'PLUS';
        }
      }
    }, 
    {
      title: 'Valor Pago',
      render: (row) => {
        return (`R$ ${row.paid_value}`);
      },
      sorter: (a, b) => a.paid_value - b.paid_value
    },
    {
      title: 'Data de Pagamento',
      render: (row) => {
        return (moment(row.paid_at).format('DD/MM/YYYY'))
      }
    },
    {
      title: 'Data de Término',
      render: (row) => {
        return (moment(row.end).format('DD/MM/YYYY'))
      }
    },
    {
      title: 'Pagante?',
      render: (row) => {
          return (
            !row.is_free_trial_subscription ?
              <div className="is-paying-true"/>
            :
              <div className="is-paying-false"/>
          );
      }
    },
  ];

    return columns;
  }

  function onChangePicker(values) {
    if(values.length === 0) {
      dispatch(getPaymentsPerDateRequest(
        moment().startOf('month').format('YYYY-MM-DD'), 
        moment().endOf('month').format('YYYY-MM-DD')));

        return;
    }

    const start = values[0];
    const end = values[1];

    dispatch(getPaymentsPerDateRequest(start.format('YYYY-MM-DD'), 
    end.format('YYYY-MM-DD')));

  }

  function totalRecipePerDate() {
    let total = 0;
    dataSource.map(item => {
      total+= item.paid_value;
    });
    
    return parseFloat(total.toFixed(4));
  }

  return (
    <Fragment>
    <Card title={
      <Row gutter={10}>
        <Col sm={{ span: 12 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{offset: 0, span: 6}} xxl={{offset: 0, span: 3}} className="title-clinics">
        <Icon type="line-chart" style={{fontSize: '20px', marginRight: '5px'}}/><span style = {{fontSize : '20px'}}>Dados Financeiros</span>
        </Col>
        <Col sm={{ offset: 2, span: 12 }} md={{ span: 9 }} lg={{ offset:0, span: 6 }} xl={{offset: 0, span: 8}} xxl={{offset: 0, span: 3}} className="card-position">
          <div className="card-clinics card-clinics-atives">
            <div className="card-clinics-header ">Receita:&nbsp;{
              `R$ ${totalRecipePerDate()}`
            }</div>
          </div>
        </Col>

        <Col sm={{ span: 22 }} md={{ span: 18 }} lg={{ span: 10 }} xl={{offset: 1, span: 8}} xxl={{offset: 0, span: 5}} className="card-position">
          <Tooltip title={'Pressione para visualizar usuários free trial'}>
            <div className="card-clinics card-clinics-manage" onClick={() => history.push('/new-payers')}>
              <div className="card-clinics-header">
                Possíveis novos usuários:&nbsp;{finance.previsionClinics.length}
              </div>
            </div>
          </Tooltip>
        </Col>

      </Row>
    }>
      <center>
        <RangePicker
          ranges={{
            Today: [moment(), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
          }}
          separator="/"
          placeholder={["Início","Fim"]}
          style={{width:'35%'}}
          format={"DD/MM/YYYY"}
          onChange={onChangePicker}
        /> 
      </center>
      <br />

      <DataTable 
        Datasource={dataSource}
        loading={finance.loading}
        Columns={getColumns()}
        Placeholder="Procure pelo Nome"
      />
      </Card>
    </Fragment>
  );
}
