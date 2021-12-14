import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSalesmansRequest} from '../../store/actions/commission.actions';
import DataTable from '../../components/DataTable';
import { Card, Button, Icon, Tooltip, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHandHoldingUsd} from '@fortawesome/free-solid-svg-icons';

export default function UsersListInactive({ history }) {
  const dispatch = useDispatch();
  const commission = useSelector(state => state.commission);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    dispatch(getAllSalesmansRequest());
  }, []);
  
  useEffect(() => {
    setDataSource(commission.allSalesmans);
  }, [commission]);

  function getColumns() {
    const columns = [{
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => {return a.name.localeCompare(b.name)},
    }, {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: 'Vendas Realizadas',
      dataIndex: 'vendas',
      key: 'vendas',
    },
    {
      title: 'Ações',
      render: (cell, row, index) => [
        <Fragment>
          <Tooltip title="Informações do Vendedor">
            <Button className="btn color-btn-editing" size="small" onClick={() => {
              history.push(`/commission/info-salesman/${row.id}`);
            }}>
              <Icon type="edit" />
            </Button>
          </Tooltip>
          &nbsp;
          <Tooltip title="Listar vendas">
            <Button className="btn ant-btn-primary" size="small" onClick={() => {
              history.push(`/commission/sales/${row.id}`);
            }}><Icon type="unordered-list" />
            </Button>
          </Tooltip>
        </Fragment>
      ]

    }];
    return columns;
  }

  return (
    <Fragment>
      <Card
       title={
        <Row>
          <FontAwesomeIcon icon={faHandHoldingUsd}></FontAwesomeIcon>
          <Icon  style={{fontSize:'20px'}}/> <span style={{fontSize:'20px'}}>Comissões</span >
        </Row>
      }>
        <DataTable
            Datasource={dataSource}
            Loading={commission.loading}
            Columns={getColumns()}
            Placeholder="Pesquise por Nome ou E-mail"
          />
        
      </Card>
    </Fragment>
  );
}
