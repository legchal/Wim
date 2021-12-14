import React, { useEffect, useState, Fragment } from 'react';
import { Card } from 'antd';
import DataTable from '../../components/DataTable';
import { getSalesmanByIdRequest } from '../../store/actions/salesman.actions';
import { useDispatch, useSelector } from 'react-redux';

export default function ({ match }) {

  const salesman = useSelector(state => state.salesman)
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    dispatch(getSalesmanByIdRequest(match.params.id));
  }, []);

  useEffect(() => {
    if(salesman.selectedSalesman !== null){
      setDataSource([salesman.selectedSalesman]);
    }
  }, [salesman]);
  
  function getColumns() {
    const columns =[{
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => {return a.name.localeCompare(b.name)},
    },{
      title: 'Telefone',
      dataIndex: 'mobile',
      render: (row) => {
        return row && row.mobile ? row.mobile : '-- - ---- ----';
      }
    },{
      title: 'E-mail',
      dataIndex: 'email',
      render: (row) => {
        return row && row.email ? row.email : 'Não informado';
      }
    },{
      title: 'CPF',
      dataIndex: 'cpf',
      render: (row) => {
        return row && row.cpf ? row.cpf : '--.---.--- - -';
      }
    },{
      title: 'Banco',
      dataIndex: 'bank_name',
      render: (row) => {
        return row && row.bank_name ? row.bank_name : 'Não informado';
      }
    },{
      title: 'Agência Bancaria',
      dataIndex: 'bank_agency',
      render: (row) => {
        return row && row.bank_agency ? row.bank_agency : 'Não informado';
      }
    },{
      title: 'Número da conta',
      dataIndex: 'bank_account_number',
      render: (row) => {
        return row && row.bank_account_number ? row.bank_account_number : '-- -- -- --';
      }
    }];

    return columns;
  }

  return (
      <Fragment>
          <Card
            title={<h1>Informações do vendedor</h1>}
          >
            <DataTable 
              Datasource={dataSource}
              Loading={salesman.loading}
              Columns={getColumns()}
              Placeholder="Pesquise por Nome ou E-mail"
            />

          </Card>
      </Fragment>
  );
}