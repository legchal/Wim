import React, { Fragment, useState } from 'react';
import { Modal, Input } from 'antd';
import { Form } from '@rocketseat/unform';

import {createUpdateSystem} from '../../services/system-update';


export default function ModalUpdateSystem({modalVisible, setmodalVisible, getUpdateSystem}) {
  const { TextArea } = Input;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoad, setIsLoad] = useState(false);
  const [labelError, setLabelError] = useState('');


  async function handleSubmit(){
    if(title.length === 0){
      setLabelError("Preencha o título e tente novamente!");
      return;
    }
    if(description.length === 0){
      setLabelError("Preencha a descrição e tente novamente!");
      return;
    }
    setLabelError('');
    setIsLoad(true);
    const update = {
      title, description
    } 
    
    await createUpdateSystem(update);
    getUpdateSystem();
    setmodalVisible(false);
    setDescription('');
    setTitle('');
    setIsLoad(false);
  }

  return (
    <Fragment>
    
      <Modal 
        onOk={isLoad ? '' : handleSubmit }
        okButtonProps={{style : isLoad ? { background: '#c6c6c6', borderColor: '#c6c6c6'} : {}}}
        cancelButtonProps={{style: {display:'none'}}}
        okText = 'Cadastrar'
        width={700}
        visible={modalVisible}
        title={<span style={{fontSize:'20px'}}>Criar Atualização</span >}
        style={{marginTop:'5%'}}
        onCancel={() => {setmodalVisible(false); setLabelError('')}}
      >
        {labelError.length > 0 &&
          <div style={{ marginTop:'-25px', marginBottom:'20px' }}>
            <label style={{ color:'#dc0000', fontSize:'16px' }}>{labelError}</label>
          </div>
        }
        <Form onSubmit={handleSubmit} style={{ marginTop: '-15px'}}>
          <label className="title-update-system-modal" >Informe o título:</label>
            <Input  onChange={(e) => setTitle(e.target.value)}  value = {title} required/>
          <label className="description-update-system-modal" >Informe a descrição:</label> 
            <TextArea
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva a atualização"
              autosize={{ minRows: 3, maxRows: 5 }}
              value={description}
              required
              />
        </Form>
      </Modal>
    </Fragment>
    );
}