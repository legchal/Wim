import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPaidSubscriptionsRequest } from '../../store/actions/clinics.actions';
import DataTable from '../../components/DataTable';
import { Button, Icon, Tooltip, Modal } from 'antd';
import moment from 'moment';
import ModalUpdateData from './modal-update-data';

export default function ModalPaidSubscriptions({ id, onOk, modalSubscriptions}) {
  const dispatch = useDispatch();
  const [modalData, setModalData] = useState(false);
  const [end, setEnd] = useState('');
  const [idSubscription,setIdSubscription] = useState('');
  const [permission, setPermission] = useState('');
  const subscriptions = useSelector(state => state.clinics.subscriptions);

  useEffect(() => {
    if(id !== '') {
      dispatch(getPaidSubscriptionsRequest(id));
    }
    const permission = localStorage.getItem('@permission');
    setPermission(permission);
  }, [id]);

  function getColumns() {
    const columns = [{
      title: 'Plano',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
    },
    {
      title: 'Usuários Adicionais',
      dataIndex: 'additional_users',
      key: 'additional_users',
      align: 'center',
    },
    {
      title: 'Espaço Adicional',
      dataIndex: 'additional_disk_space_gb',
      key: 'additional_disk_space_gb',
      align: 'center',
    }, 
    {
      title: 'SMS Adicionais',
      dataIndex: 'additional_sms',
      key: 'additional_sms',
      align: 'center',
    },
    {
      title: 'Valor',
      dataIndex: 'paid_value',
      key: 'paid_value',
      align: 'center',
    },
    {
      title: 'Início',
      render: (row) => {
        return ( 
          moment(row.start).format('DD/MM/YYYY')
        );
      },
      key: 'start',
      align: 'center',
    },
    {
      title: 'Fim',
      render: (row) => {
        return ( 
          moment(row.end).format('DD/MM/YYYY')
        );
      },
      key: 'end',
      align: 'center',
    },
    {
      title: 'Ações',
      align: 'center',
      render: (row) => [
        <Tooltip placement="top" title={permission === 'developer' ? 'Editar Fim' : 'Sem permissão para alterar o fim, crie um chamado.'}>
          <Button 
            disabled={permission === 'developer' ? false : true}
            className="btn color-btn-editing" size="small" onClick={() => {
              setModalData(true);
              setEnd(moment(row.end));
              setIdSubscription(row.id);
          }}>
            <Icon type="edit" />
          </Button>
        </Tooltip>
      ]
    }
  ];
    return  columns;
}
  return (
      <Fragment>
        <Modal
          onOk={onOk}
          onCancel={onOk}
          width={950}
          visible={modalSubscriptions}
          cancelText= 'Cancelar'
        >
        <div style={{ marginTop: '18px'}}>
          <DataTable
              Datasource={subscriptions.data}
              Columns={getColumns()}
              size="small"
          />
          </div>
        </Modal>

        <ModalUpdateData visible={modalData} cancel={setModalData} dataEnd={end} id={idSubscription} id_clinic_subscription={id}/>
      </Fragment>
    
  );
}
