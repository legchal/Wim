import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Button, Icon, Alert, Tooltip} from 'antd';
import DataTable from '../../components/DataTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import {getAllTicketRequest} from '../../store/actions/ticket.actions';
import { setTicketRead } from '../../services/ticket';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Loader2 } from '../../components/Loader';
import moment from 'moment';


export default function GenerateTickets({ history }) {
  const dispatch = useDispatch();
  const tickets = useSelector(state => state.ticket);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
 

  useEffect(() => { 
    dispatch(getAllTicketRequest())
  }, [])

  useEffect(() =>{
    setDataSource(tickets.allTicket)
  },[tickets]) 

  async function ticketToBeRead(id){
    setLoading(true);
    await setTicketRead(id);
    await dispatch(getAllTicketRequest());
    setLoading(false);
  }

  function getColumns() {
    const columns = [
      {
        title: 'Ticket',
        render: (row) =>  
        <span
          style={{
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            KhtmlUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            userSelect: 'none'
          }}
        >
          {row.ticket_code}
        </span>
      },

      {
        title: 'Duração',
        dataIndex: 'months',
        width: '10%',
        filters: [
          // { text: 'mensal', value: 1}, 
          // { text: 'semestral', value: 6}, 
          { text: '14 Dias', value: 14 },
          { text: '12 Meses', value: 12 }
          // { text: 'sem recorrência', value: null},
        ],
        onFilter: (value, record) => record.months === value,
        render: (text, row) => {
            // if(row.months === 1){
            //   return '1 mês';
            // }
            // if(row.months === 6){
            //   return '6 meses';
            // }
            if(row.months === 12){
              return '12 meses';
            }
            if(row.months === 14){
              return '14 dias';
            }
        }
      },

      {
        title: 'Plano',
        render: (row) => {
          return (
            row.wim_plan_id === 3 && 'Premium' 
          );
        }
      },

      { 
        title: 'Criado em',
        render: (row) => {
          return ( 
            moment(row.created_at).format('DD/MM/YYYY')
          );
        }
      },

      { 
        title: 'Validade',
        render: (row) => {
          return ( 
            moment(row.valid_at).format('DD/MM/YYYY')
          );
        }
      },

      {
        title: 'Ações',
        render: (cell, row, index) => [
          <CopyToClipboard
              text={row.ticket_code}
              onCopy={() => { }}>
              <Tooltip title="Copiar ticket">
                  <Button type = 'primary' onClick={() => {
                    toast.info('TICKET COPIADO.', { autoClose: 1500 });
                    ticketToBeRead(row.id);
                  }}><Icon type="copy" /></Button>
              </Tooltip>
            </CopyToClipboard>
          // <Tooltip title="Copiar ticket">
          //   <Button type = 'primary' onClick={() => toast.info('TICKET COPIADO.', { autoClose: 1500 })}><Icon type="copy" /></Button>
          // </Tooltip>
        ]
  
      }


    ];
    return columns;
  }

  return (
    <Fragment>
      <Loader2 loading={loading} />
      <Card
        title={
          <Row>
            <FontAwesomeIcon icon={faTicketAlt} /><span style = {{fontSize :'20px'}}> Tickets </span>
          </Row>
        }
      >
        <center>
          <Alert
            message=""
            description={
              <span style={{fontSize: 18 }} >Para copiar o ticket utilize o botão na coluna "Ações". Ao copiar o ticket ele deixará de ser listado, constando que ele já foi designado à um cliente.</span>
            }
            style={{ width: '50%', textAlign: "center", marginBottom: '25px'}}
            type="warning"
            showIcon
          />
        </center>
        <DataTable 
          Datasource={dataSource}
          Loading={loading}
          Columns={getColumns()}
          notSearch={true}
        />
      </Card>
    </Fragment>
  );
} 