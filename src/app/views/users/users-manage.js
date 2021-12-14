import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStatesRequest } from '../../store/actions/users.actions';
import DataTable from '../../components/DataTable';
import { Card, Row, Col, Button, Icon, Tooltip } from 'antd';

export default function UsersListInactive({ history }) {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllStatesRequest());
  }, []);
  
  useEffect(() => {
    setIsLoading(users.loading);
    setDataSource(users.allStates);
    setIsLoading(users.loading);
    
  }, [users]);

  function getColumns() {
    const columns = [{
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => {return a.name.localeCompare(b.name)},
    }, {
      title: 'E-mail',
      render: row => {
        return row && row.email ? row.email : 'Não informado';
      }
    },
    {
      title:'ID',
      dataIndex:'id',
      key:'id'
    },    
    {
      title: 'Celular',
      render: row => {
        return row && row.mobile ? row.mobile : 'Não informado';
      }
    },
    {
      title: 'CPF',
      render: row => {
        return row && row.cpf ? row.cpf : '---/---';
      }
    },
    {
      title: 'Clínica',
      dataIndex: 'fantasy_name',
      key: 'fantasy_name',
    },
    {
      title: 'Ações',
      render: (cell, row, index) => [
        <Tooltip title="Editar Usuário">
          <Button className="btn color-btn-editing" size="small" onClick={() => {
            history.push(`user-editing/${row.id}`);
          }}><Icon type="edit" /></Button>
        </Tooltip>
      ]

    }];
    return columns;
  }

  return (
    <Fragment>
      <Card
        title={
          <Row>
              <Icon type="team" style={{fontSize:'20px'}}/> <span style={{fontSize:'20px'}}>Todos os Usuários</span >
              <Col md={{ span: 6 }} sm={{ span: 12 }} lg={{ span: 6 }} className="card-position">
                <div className="card-clinics card-clinics-manage">
                  <div className="card-clinics-header">Total:&nbsp;{users.allStates.length}&nbsp;usuários</div>
                </div>
              </Col>
          </Row>
        }
      >
        <DataTable
            Datasource={dataSource}
            Loading={isLoading}
            Columns={getColumns()}
            Placeholder="Procure pelo Nome, E-mail ou ID"
          />
        
      </Card>
    </Fragment>
  );
}
