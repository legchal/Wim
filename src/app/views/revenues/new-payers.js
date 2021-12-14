import React, { useEffect, useState, Fragment } from 'react';
import DataTable from '../../components/DataTable';
import { useSelector } from 'react-redux';
import { Card, Col, Row} from 'antd';
import moment from 'moment';

export default function NewPayers(data) {
  const finance = useSelector(state => state.finance);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setDataSource(finance.previsionClinics);
  }, [finance])

  function getColumns() {
    const columns = [{
      title: 'Clínica',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => {return a.name.localeCompare(b.name)},
    },
    {
      title: 'Administrador',
      dataIndex: 'usuario',
      key: 'usuario',
    },
    {
      title: 'E-mail do Admin',
      dataIndex: 'email',
      key: 'email',
    }, 
    {
      title: 'Plano',
      render: (row) => {
        if(row.plan_code === 'premium_plan_01') {
          return 'PREMIUM'
        } else if(row.plan_code === 'dmm_plan_01') {
          return 'DMM';
        } else if(row.plan_code === 'plus_plan_01') {
          return 'PLUS';
        }
      }
    }, {
      title: 'Telefone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Celular',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'Data de Vencimento',
      render: (row) => {
        return (moment(row.end).format('DD-MM-YYYY'))
      }
    }
  ];

    return columns;
  }
  
  return(
    <Fragment>
    <Card title={
      <Row>
        <Col md={{ span: 6 }} sm={{ span: 12 }} lg={{ span: 6 }} className="title-clinics">
                <h4>PREVISÃO DE POSSÍVEIS NOVOS PAGANTES</h4>
        </Col>
      </Row>
    }>
      <DataTable 
        Datasource={dataSource}
        loading={finance.loading}
        Columns={getColumns()}
        Placeholder="Procure pelo Nome ou E-mail"
      />
      </Card>
    </Fragment>
  );  
}