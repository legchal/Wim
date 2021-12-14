import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClinicWimRequest, getUsersClinicRequest } from '../../store/actions/clinics.actions';
import DataTable from '../../components/DataTable';
import { Button, Icon, Tooltip, Modal  } from 'antd';

export default function UsersFromClinicModal({ id, history, visible, onOk }) {
  const dispatch = useDispatch();
  const clinics = useSelector(state => state.clinics);

  useEffect(() => {
    if(id !== '') {
      dispatch(getClinicWimRequest(id));
      dispatch(getUsersClinicRequest(id));
    }
  }, [id]);

  function getColumns() {
    const columns = [{
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => {return a.name.localeCompare(b.name)}
    }, {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    }, {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: 'Celular',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'CPF',
      dataIndex: 'cpf',
      key: 'cpf',
    },
    {
      title: 'Ações',
      render: (cell, row, index) => [
        <Tooltip placement="top" title={'Editar Usuário'}>
          <Button className="btn color-btn-editing" size="small" onClick={() => {
            history.push(`/user-editing/${row.id}`);
          }}>
            <Icon type="edit" />
          </Button>
        </Tooltip>
      ]

    }];
    return columns;
  }
  

  return (
        <Modal
          onOk={onOk}
          visible={visible}
          onCancel={onOk}
          width={950}
        >
        <div style={{ marginTop: '18px'}}>
          <DataTable
              Datasource={clinics.usersFromClinic}
              Columns={getColumns()}
              size="small"
              Placeholder="Pesquise por Nome ou e-mail"
          />
          </div>
        </Modal>
  );
}
