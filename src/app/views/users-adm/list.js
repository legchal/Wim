import React, { useEffect } from 'react';
import { Button, Icon, Tooltip, Popconfirm, Card, Row } from 'antd';
import { getAllUsersRequest, destroyUserRequest } from '../../store/actions/useradmin.actions';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-toastify';
import DataTable from '../../components/DataTable';

export default function ListUsersAdmin( { history } ) {
  const dispatch = useDispatch();
  const users = useSelector(state => state.usersAdm);

  useEffect(() => {
    dispatch(getAllUsersRequest());
  }, [])

  function handleConfirm(e){
    if(e.id){
      if(e.email === localStorage.getItem('@email')) {
        toast.error('Não é possivel apagar você mesmo!');
        return;
      }
      dispatch(destroyUserRequest(e.id));
      setTimeout(() => {
          dispatch(getAllUsersRequest());
        }, 350)
    } 
    
  }

  function handleCancel(e){
    return;
  }

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => {return a.name.localeCompare(b.name)},
    }, 
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Permissão',
      dataIndex: 'permission',
      key: 'permission',
      render: (row) => {
        if(row === 'super'){
          return 'Administrador';
        }
        if(row === 'developer'){
          return 'Desenvolvedor';
        }
        if(row === 'support'){
          return 'Suporte';
        }
        if(row === 'finance'){
          return 'Financeiro';
        }
        if(row === 'salesman'){
          return 'Vendedor';
        }
      }
    },
    {
      title: 'Ações',
      render: (row) => [
        <Tooltip title="Editar">
          <Button type="default" className="color-btn-editing" size="small" onClick={() => {
            history.push(`/edit-user/${row.id}`);
          }}>
            <Icon type="edit" />
          </Button> &nbsp;
        </Tooltip>,
        <Tooltip title="Excluir">
          <Popconfirm
              title="Deseja excluir este usuário?"
              onConfirm={() => handleConfirm(row)}
              onCancel={handleCancel}
              okText="Sim"
              cancelText="Não"
          >
            <Button type="danger" size="small"><Icon type="close" /></Button>
          </Popconfirm>
          
        </Tooltip>
      ],
    }
  ]
  return (
    <Card title = {
      <Row>
        <Icon type="unordered-list" style={{fontSize:'20px'}}/> <span style={{fontSize:'20px'}}>Lista de Usuários</span >
      </Row>
    }>
      <DataTable 
        Loading={users.loading}
        Columns={columns}
        Datasource={users.allUsersAdm}
        Placeholder="Procure pelo Nome ou E-mail"
      />
    </Card>
  );
}
