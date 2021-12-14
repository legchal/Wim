import React, { useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, DatePicker, Col, Icon} from 'antd';
import DataTable from '../../components/DataTable';
import { Loader2 } from '../../components/Loader';
import moment from 'moment';
import {getLogAcessRequest, getLogAcessMonthRequest, getLogAcessDayRequest} from '../../store/actions/log.actions';


export default function LogsAccess({ history }) {
  const dispatch = useDispatch();
  const LogsAccess = useSelector(state => state.log.logAccess);
  const LogsMonthAccess = useSelector(state => state.log.logAccessMonth);
  const LogsDayAccess = useSelector(state => state.log.logAccessDay);

  const [dataSource, setDataSource] = useState([]);
  const [accessDayCount, setAccessDayCount] = useState(0);
  const [accessMonthCount, setAccessMonthCount] = useState(0);
  const [accessCountSearch, setAccessCountSearch] = useState(0);
  const [accessCountMonthDistinct, setAccessCountMonthDistinct] = useState(0);
  const [cardVisible, setCardVisible] = useState(false);
  const [loading] = useState(false);
  const [cardDiario, setCardDiario] = useState(true);
  const [cardMensal, setCardMensal] = useState(false);
  const [cardResult, setCardResult] = useState(false);
  
  const { RangePicker } = DatePicker;

  function getColumns() {
    const columns = [
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'nome',
        align: 'center'
      },
      {
        title: 'E-mail',
        align: 'center',
        render: (row) => {
          return row && row.email ? row.email : 'Não informado';
        },
      },
      {
        title: 'Razão Social (Clínica)',
        align: 'center',
        render: (row) => {
          return row && row.social_reason ? row.social_reason : 'Não informado';
        },
      },
      {
        title: 'Nome Fantasia (Clínica)',
        align: 'center',
        render: (row) => {
          return row && row.fantasy_name ? row.fantasy_name : 'Não informado';
        }
      },
      {
        title: 'Plataforma',
        dataIndex: 'plataform',
        filters: [
          { text: 'Mobile', value: 'mobile'}, 
          { text: 'Web', value: 'web' },
          { text: 'Mobile App', value: 'mobile-app'},
        ],
      
        onFilter: (value,record) => record.plataform !== null && record.plataform === value,
        render: (text, row) =>{
          switch(row.plataform){
            case 'mobile':
              return 'Mobile';
            case 'mobile-app':
              return 'Mobile App';
            case 'web':
              return 'Web';
            default: 
              return '-';
          }
        },
        width: '10%',
        align: 'center'
      },
      { 
        title: 'Acesso',
        render: (row) => {
          return ( 
            moment(row.hour).format('DD/MM/YYYY - HH:mm')
          );
        },
        align: 'center'
      }
    ];
    return columns;
  }

  function onChangePicker(values) {
    if(values.length === 0) {
      dispatch(getLogAcessRequest(
        moment().startOf('day').format('YYYY-MM-DD'), 
        moment().endOf('day').format('YYYY-MM-DD')));
        setCardVisible(false);
        setCardDiario(true);
        setCardResult(false);
        return;
    }
    dispatch(getLogAcessRequest(
      values[0].format('YYYY-MM-DD'), values[1].format('YYYY-MM-DD'))
    );
    setCardVisible(true);
    setCardDiario(false);
    setCardResult(true);
    setCardMensal(false);
  }

  function onChangeAccessDay(){
    dispatch(
      getLogAcessDayRequest(
        moment().startOf('day').format('YYYY-MM-DD'), 
        moment().endOf('day').format('YYYY-MM-DD')
      )
      );
  }

  function onChangeAccessMonth(){
    dispatch(
      getLogAcessMonthRequest(
        moment().startOf('month').format('YYYY-MM-DD'), 
        moment().endOf('month').format('YYYY-MM-DD'),
        0
      )
    );
  }

  useEffect(() => { 
    onChangeAccessDay();
    onChangeAccessMonth();
    dispatch(getLogAcessRequest(
      moment().startOf('day').format('YYYY-MM-DD'), 
      moment().endOf('day').format('YYYY-MM-DD')));
  },[]);

  useEffect(() => {
    console.log(LogsAccess);
    setDataSource(LogsAccess.data);
    if(LogsDayAccess.data !== undefined && LogsMonthAccess.data !== undefined && LogsAccess.data !== undefined){
      setAccessMonthCount(LogsMonthAccess.data.length);
      setAccessDayCount(LogsDayAccess.data.length);
      setAccessCountSearch(LogsAccess.data.length);
      setAccessCountMonthDistinct(LogsMonthAccess.countAccess[0].count);
      if(cardVisible){
        setAccessCountMonthDistinct(LogsAccess.countAccess[0].count);
      }
    }
  },[LogsAccess,LogsMonthAccess,LogsDayAccess]);


  return (
    <Fragment>
      <Loader2 loading={loading} />
      <Card
      title={
        <Row>
          <Icon type="fund" style={{fontSize:'20px'}}/> <span style={{fontSize:'20px'}}>Acessos</span >
        </Row>
      }>
        <center style={{marginTop:'-15px'}}>
        <Row gutter={8} justify='center' style={{justifyItems:'center'}}>
         <Col sm={{ offset:5, span: 15 }}  md={{ offset:1,  span: 9 }} lg={{ offset: 1, span: 7 }} xl={{ offset: 2, span: 7 }} xxl={cardVisible ? { offset: 2, span: 5} : { offset: 4, span: 5}} >
            <div className={cardDiario === false ? "cardLog card-clinics-graph" : "cardLog card-clinics-graph cardFocus"} onClick={()=> {setDataSource(LogsDayAccess.data); setCardDiario(true); setCardMensal(false); setCardResult(false);}}>
                <div className="card-headerLog">Diários</div>
                <div className="card-numberLog">{accessDayCount}</div>
            </div>
          </Col>
          <Col sm={{ offset:5, span: 15 }} md={{ offset:2, span: 9 }} lg={{ offset: 0, span: 7 }} xl={{ span: 7 }} xxl={{ span: 5 }}>
            <div className={cardMensal === false ? "cardLog card-clinics-graph" : "cardLog card-clinics-graph cardFocus"} onClick={()=> {setDataSource(LogsMonthAccess.data); setCardDiario(false); setCardMensal(true); setCardResult(false);}}>
                <div className="card-headerLog ">Mensais</div>
                <div className="card-numberLog">{accessMonthCount}</div>
            </div>
          </Col>
          {cardVisible === true ? 
            <Col sm={{ offset:5, span: 15 }} md={cardDiario ? { offset: 2, span: 9 } : { offset:1, span: 9 }} lg={{ offset: 0, span: 7 }} xl={{ span: 7 }} xxl={{ span: 5 }}>
              <div className={cardResult === false ? "cardLog card-clinics-graph" : "cardLog card-clinics-graph cardFocus"} onClick={()=> {setDataSource(LogsAccess.data); setCardDiario(false); setCardMensal(false); setCardResult(true);}}>
                  <div className="card-headerLog ">Resultados</div>
                  <div className="card-numberLog">{accessCountSearch}</div>
              </div>
            </Col>
          : <div/>
          }
          {cardVisible === false &&  
            <Col  sm={{ offset:5, span: 15 }} md={{ offset:2, span: 10 }} lg={{ offset: 0, span: 7 }} xl={{ span: 7 }} xxl={{ span: 5 }}>
              <div className="cardLog card-clinics-graph unics">
                <div className="card-headerLog ">{cardVisible ? "Únicos" :  "Únicos mensais"}</div>
                <div className="card-numberLog">{accessCountMonthDistinct}</div>
              </div>
            </Col>
          } 
          {cardVisible === true && 
            <Col sm={{ offset:5, span: 15 }} md={ cardVisible ? { offset: 2, span: 9 } : { span: 9 }} lg={ cardResult ? { offset: 1, span: 7 } : { offset: 0, span: 7 }} xl={ cardResult ? { offset: 2, span: 7 } : { span: 7 }} xxl={{ offset: 0, span: 5 }}>
              <div className="cardLog card-clinics-graph unics">
                <div className="card-headerLog ">{cardVisible ? "Únicos" :  "Únicos mensais"}</div>
                <div className="card-numberLog">{accessCountMonthDistinct}</div>
              </div>
            </Col>
          }
          
        </Row>
        </center>
        
        {/* <Divider style={{marginBottom: '25px'}} />  */}
        <center style={{ marginTop:'20px', marginBottom:'20px'}}>
          <RangePicker
          ranges={{
            Today: [moment(), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
          }}
          separator="/"
          onChange={onChangePicker}
          format={"DD/MM/YYYY"}
          placeholder={["Início", "Fim"]}
          /> 
        </center>
        
        <DataTable 
          Placeholder={"Pesquise por Nome, E-mail ou Razão Social"}
          Datasource={dataSource}
          Loading={loading}
          Columns={getColumns()}
        />
      </Card>
    </Fragment>
  );
} 