import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateEndPaidSubscriptionRequest, getPaidSubscriptionsRequest } from '../../store/actions/clinics.actions';
import { Modal, DatePicker  } from 'antd';
import moment from 'moment';
import swal from 'sweetalert2';

export default function ModalUpdateData({ id, visible, cancel, dataEnd, id_clinic_subscription}) {
  const dispatch = useDispatch();
  const [date, setDate] = useState('');

  const dateEndAtual = moment(date).format('DD/MM/YYYY');

  const dateEndAnterior = moment(dataEnd._i).format('DD/MM/YYYY');

  function handleSubmit(){
    if(dateEndAnterior === dateEndAtual || date === '' ){
      swal('Atenção','Selecione uma data diferente da atual !','warning');
      return;
    }
    swal({ 
      title: 'Tem certeza ? ',
      text: 'Deseja realmente alterar a data de acesso desta clínica ?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
      closeOnConfirm: false,
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        dispatch(updateEndPaidSubscriptionRequest(id,date));
        setTimeout(()=>{
          dispatch(getPaidSubscriptionsRequest(id_clinic_subscription));
        }, 500)
        onCancelModalData();
      }
    })
  }

  function onCancelModalData() {
    cancel(false);
   }

  function onChangeDate(value){
    setDate(moment(value._d).format('YYYY-MM-DD'));
  }
  const dateFormat = 'DD/MM/YYYY';

  return (
    
      <Modal
        visible={visible}
        title= 'Editar Data Fim'
        onOk={handleSubmit}
        onCancel={onCancelModalData}
        style={{marginTop: '40px'}}
        cancelText= 'Cancelar'
      >
        <p className="p-modal-data-end">Selecione uma data abaixo para alterar o acesso da clínica !</p>
        <div className="container-date-picker">
          <DatePicker
            defaultValue={dataEnd}
            format={dateFormat}
            onChange={onChangeDate}
            /> 
        </div>
      </Modal>
  );
}
