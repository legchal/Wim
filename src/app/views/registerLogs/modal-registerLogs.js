import React, { Fragment } from 'react';
import {  Modal, Input } from 'antd';

export default function ModalRegisterLogs({ row, onOk, modalVisible, type, setmodalVisible}) {

  const { TextArea } = Input;
  return (
    <Fragment>
      <Modal
          onOk={onOk}
          cancelButtonProps={{style: {display:'none'}}}
          width={700}
          visible={modalVisible}
          title={<span style={{fontSize:'20px'}}>Detalhes - { type }</span >}
          style={{marginTop:'5%'}}
          onCancel={() => setmodalVisible(false)}
      >
        <TextArea rows={15} value={ row.description } style={{fontSize:'16px'}}/>
      </Modal>
    </Fragment>
    
  );
}
