import React, { useState, Fragment, useEffect } from 'react';
import { Card, Row, Alert, Divider, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { generateNewTickets, areThereTicket } from '../../services/ticket';
import swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Loader2 } from '../../components/Loader';


export default function GenerateTickets({ history }) {
  const [loading, setLoading] = useState(false);
  const [permissionGenerateYear, setpermissionGenerateYear] = useState(false);
  const [permissionGenerateDays, setpermissionGenerateDays] = useState(false);

  useEffect(() => {
    fetchData();
  });

  async function fetchData(){
    const count = await areThereTicket();
    //console.log('teste generate', count.ticketDays, count.ticketYear);
    if(count.ticketDays <= 0) {
      setpermissionGenerateDays(true);
    }
    if(count.ticketYear <= 0) {
      setpermissionGenerateYear(true);
    }
  }

  async function generateTickets(date) {
    setLoading(true);
    const newTickets = await generateNewTickets(date);
    if(newTickets.data.tickets){
      swal('Tickets gerados com sucesso',  'Ao clicar em "OK" você será redirecionado para a página de listagem dos tickets.', 'success').then(async () => {
        await history.push('/ticket-list');
      })
    }else{
      toast.error('Falha ao gerar tickets, tente mais tarde ou comunique os desenvolvedores.');
    }
    setLoading(false);
  }
  return (
    <Fragment>
      <Loader2 loading={loading} />
      <Card
        title={
          <Row>
            <span  style = {{fontSize:'20px'}}><FontAwesomeIcon icon={faCogs} />&nbsp;Gerador de Tickets</span>
          </Row>
        }
      >
      <center>
        <Alert
          message=""
          description={
            <Fragment>
              { permissionGenerateYear === true || permissionGenerateDays === true ? 
              <span style={{fontSize: 18 }} >Serão gerados <strong>100 tickets</strong> com validade de <strong>14 dias ou 12 meses</strong>, verifique se todos os tickets válidos já foram utilizados antes de gerar novos.</span>
              :
              <span style={{fontSize: 18 }} >Não é possível gerar novos tickets, pois ainda existem tickets disponíveis para utilização! <br /> Para ver os tickets acesse o menu Tickets -&gt;Listar</span>
            }
            </Fragment>
          }
          style={{ width: '50%', textAlign: "center", marginBottom: '25px'}}
          type="warning"
          showIcon
        />
      </center>
      <Divider />
      <center>
         <Button
          type="primary"
          style={{ marginTop: '25px' }}
          onClick={() => generateTickets(14)}
          disabled={!permissionGenerateDays}
        >
          <span><FontAwesomeIcon icon={faCogs} />&nbsp;GERAR TICKETS 14 DIAS</span>
        </Button>
        <Button
          type="primary"
          style={{ marginTop: '25px', marginLeft: '15px' }}
          onClick={() => generateTickets(12)}
          disabled={!permissionGenerateYear}
        >
          <span><FontAwesomeIcon icon={faCogs} />&nbsp;GERAR TICKETS 12 MESES</span>
        </Button>
      </center>
      </Card>
    </Fragment>
  );
} 