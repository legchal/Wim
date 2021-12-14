import React from 'react';
import { Modal, Input, Button, Icon } from 'antd';
import { setRead } from '../../services/suggestion';
import swal from 'sweetalert2';
import './styles.css';

export default function ModalSuggestion({ row, modalVisible, onOK, getSuggestions }) {
  const { TextArea } = Input;

  async function setSuggestionRead(id){
    swal({ 
      title: 'Tem certeza ? ',
      text: 'Deseja realmente marcar esta sugestão como lida ?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
      closeOnConfirm: false,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.value) {
        await setRead(id);
        onOK()
        getSuggestions()
      }
    })
  }
  
  return (
    <>
      <Modal
        onOk={onOK}
        cancelButtonProps={{ style: { display: 'none' } }}
        width={700}
        visible={modalVisible}
        title={<span style={{ fontSize: '20px' }}>Sugestão - {row.type}</span >}
        style={{ marginTop: '5%' }}
        onCancel={onOK}
      >
        <div className="containerModal">
          <div>
            <label className="labelModal" >Clínica:</label>
            <Input value={row.Clinic ? row.Clinic.fantasy_name : ''} className="inputModal"  disabled={true} style={{cursor: 'initial'}}/>          
          </div>
          <div>
            <label className="labelModal" >Usuário:</label>
            <Input value={row.User ? row.User.name : ''} disabled={true} className="inputModal"  style={{cursor: 'initial'}} />
          </div>           
        </div>
        <div className="textAreaModal">
          <label className="labelModal" >Sugestão enviada:</label>
          <TextArea rows={5} value={row.description} className="inputModal" style={{cursor: 'initial'}} disabled={true} />
        </div>

          <Button className="btn btn-att" id="btnModal"  onClick={() => setSuggestionRead(row.id)}><Icon type="check" id="iconModalRead" />Marcar como lido</Button>
      </Modal>
    </>
  )
}