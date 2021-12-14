import React, { useEffect } from 'react';
//import InputUnform from '../../components/InputUnform';
import socket from '../../config/socket';
import { Form } from '@rocketseat/unform';
import { Card, Row, Icon } from 'antd';

export default function DashboardAdm() {
  useEffect(() => {
    socket.on('message', function(message) {
      console.log(message);
    });
  }, []);

  return (
    <Form>
      <Card  title={
        <Row>
          <Icon type="dashboard" style={{fontSize:'20px'}}/> <span style={{fontSize:'20px'}}>Dashboard</span >
        </Row>
      }>
      </Card>
    </Form>
  );
}


