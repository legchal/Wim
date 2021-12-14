import React, { useEffect, useState, Fragment } from 'react';
import { getAllSalesmanRequest } from '../../store/actions/salesman.actions';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Button, Card, Modal, Tooltip, Row} from 'antd';
import DataTable from '../../components/DataTable';


export default function SalesmanList({ history }) {
  const dispatch = useDispatch();
  const salesman = useSelector(state => state.salesman);
  const [linkSalesman, setLinkSalesman] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState();

  useEffect(() => {
    dispatch(getAllSalesmanRequest());
  }, []);

  useEffect(() => {
    setDataSource(salesman.allSalesman);
  }, [salesman]);


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
      title: 'Celular',
      render: row => {
        return row && row.mobile ? row.mobile : 'Não informado';
      }
    },
    {
      title: 'CPF',
      render: row => {
        return row && row.cpf ? row.cpf : 'Não informado';
      }
    },
    {
      title: 'Banco', 
      render: row => {
        return row && row.bank_name ? row.bank_name : ' --- / ---';
      }
    },
    {
      title: 'Agencia',
      render: row => {
        return row && row.bank_agency ? row.bank_agency : 'Não informado';
      }
    },
    {
      title: 'Conta',
      render: row => {
        return row && row.bank_account_number? row.bank_account_number : '--- / ---';
      }
    },
    {
      title: 'Ações',
      render: (cell, row, index) => [
        <Tooltip title="Link">
          <Button size="small" onClick={() => {
              setLinkSalesman(row.id);
              setModalVisible(true);
            }}><Icon type="link" />
          </Button>
        </Tooltip>,
        <Tooltip title="Gráficos">
          <Button size="small" onClick={() => {
            history.push(`salesman-sales/${row.id}`);
          }}><Icon type="line-chart" /></Button>
        </Tooltip>
      ]

    }];
    return columns;
  }

  return (

    <Fragment>
      <Card 
      title= {
        <Row>
          <Icon  type="team" style = {{fontSize :'20px'}}/> <span style = {{fontSize : '20px'}}>Lista de Vendedores</span>
        </Row>
        }
        
      >
        <DataTable
          Loading={salesman.loading}
          Datasource={dataSource} 
          Columns={getColumns()}
          Placeholder="Procure pelo Nome ou E-mail"
        />
        
      </Card>
      <Modal
        title="Link"
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
      >
        {
          salesman.allSalesman.map((item) => {
            if (item.id === linkSalesman) {
              return <div><a href={`https://app.wimdental.com/#/cadastro-afiliado?code=${item.id}`}>https://app.wimdental.com/#/cadastro-afiliado?code={item.id}</a></div>
            }
            return false;
          })
        }
      </Modal>
    </Fragment>
  );
}
