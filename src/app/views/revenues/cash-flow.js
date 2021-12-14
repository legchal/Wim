/* eslint array-callback-return: 0 */ //--> OFF

import React, { useEffect, useState, Fragment } from 'react';
import DataTable from '../../components/DataTable';
import IntlCurrencyInput from '../../components/format-currency';
import { 
  getAllCashFlowRequest, 
  newExpenseRequest, 
  getCashFlowEditingRequest,
  updateExpenseRequest,
  deleteExpenseRequest,
  getRecipeRequest,
  paidExpenseRequest,
  activesPendingRequest,
  clearRecipe,
  clearActivesPending
} from '../../store/actions/finance.actions';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Card, 
  DatePicker, 
  Col, 
  Row, 
  Tooltip, 
  Button, 
  Modal, 
  Checkbox, 
  Divider, 
  Icon, 
  Input,
  InputNumber,
  Popconfirm,
  Radio,
} from 'antd';
import moment from 'moment';
import { Form } from '@rocketseat/unform';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';

const { RangePicker } = DatePicker;

export default function RevenuesList({ history }) {
  const dispatch = useDispatch();
  const finance = useSelector(state => state.finance);
  const [dataSource, setDataSource] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleRecipe, setModalVisibleRecipe] = useState(false);
  const [checkValue, setCheckValue] = useState(false);
  const [checkValuePlot, setCheckValuePlot] = useState(false);
  const [newExpenses, setNewExpenses] = useState(true);
  const [expenseEditingId, setExpenseEditingId] = useState(null);
  const [plots, setPlots] = useState();
  const [value, setValue] = useState();
  const [recurrent, setRecurrent] = useState(1);
  const [disabledCheckBox, setDisabledCheckBox] = useState(false);
  const [type, setType] = useState('');
  const [datePay, setDatePay] = useState(moment().format('YYYY/MM/DD'));
  const [start, setStart] = useState(moment().startOf('month').subtract(1, 'days').format('YYYY-MM-DD'));
  const [end, setEnd] = useState(moment().endOf('month').format('YYYY-MM-DD'));
  const [pay, setPay] = useState(moment());

  useEffect(() => {
    dispatch(getAllCashFlowRequest(start, end));
    dispatch(activesPendingRequest(start));
    dispatch(getRecipeRequest(start, end));
  }, []);

  useEffect(() => {
    if(finance.cashFlow.financesFixed|| finance.cashFlow.financesNotFixed){
      if(finance.activesPending && finance.activesPending !== 0){
        setDataSource([
          ...finance.cashFlow.financesFixed, 
          ...finance.cashFlow.financesNotFixed,
          ...finance.activesPending
        ]);
      } else {
        setDataSource([
          ...finance.cashFlow.financesFixed, 
          ...finance.cashFlow.financesNotFixed,
        ]);
      }
      if(finance.recipe.value && finance.recipe.value !== 0){
        setDataSource([...finance.cashFlow.financesFixed, ...finance.cashFlow.financesNotFixed, finance.recipe]);        
      }  
    }
  }, [finance]);

  useEffect(() => {
    if(finance.getCashFlowEditing.data){
        setPay(moment(finance.getCashFlowEditing.data.cashflow.pay_at));
        setCheckValue(finance.getCashFlowEditing.data.cashflow.fixed);
        setCheckValuePlot(finance.getCashFlowEditing.data.cashflow.is_installment);
        setPlots(finance.getCashFlowEditing.data.cashflow.installments_quantity);
        setValue(finance.getCashFlowEditing.data.cashflow.value);
        setType(finance.getCashFlowEditing.data.cashflow.type);
        setNewExpenses(false);
      if(finance.getCashFlowEditing.data.cashflow.direction === 'out'){
          setModalVisible(true);
      }else{
          setModalVisibleRecipe(true);
      }
    }    
    
    
  }, [finance.getCashFlowEditing.data])

  function getColumns() {
    const columns = [
      {
        title: 'Tipo',
        dataIndex: 'direction',
        filters: [
          { text: 'Receita', value: 'in',}, 
          { text: 'Despesa', value: 'out' }, 
        ],
        onFilter: (value, record) => record.direction.indexOf(value) === 0,
        render: (text, row) => {
          if(row.direction === 'in'){
            return 'Receita';
          }
          if(row.direction === 'out'){
            return 'Despesa';
        }
      }},
      {
      title: 'Descricao',
      dataIndex: 'type',
      key: 'type',
    }, 
    {
      title: 'Valor',
      render: (row) => {
        return (`R$ ${parseFloat(row.value).toFixed(2)}`);
      }
    },
    {
      title: 'Vencimento',
      render: (row) => {
        return (moment(row.pay_at).format('DD/MM/YYYY'))
      }
    },
    {
      title: 'Pago em',
      render: (row) => {
        return (row.paid_at ? moment(row.paid_at).format('DD/MM/YYYY') : <span style={{color: 'red'}}>Pendente</span>)
      }
    },
    {
      title: 'Ações',
      align: 'center',
      render: (row, index) => [
        row.type !== "Mensalidades WIM" ?
        <Tooltip title='Editar'>
          <Button disabled={localStorage.getItem('@permission') !== 'finance' ? true : false } size="small" onClick={() => {
            setNewExpenses(false);
            handleEditing(row.id);
          }} className="btn color-btn-editing" ><Icon type="edit" /></Button>
        </Tooltip> : <Tooltip title='Não é possível editar esse registro'>
          <Button disabled={localStorage.getItem('@permission') !== 'finance' ? true : false } size="small" onClick={() => {
            handleEditing(row.id);
          }} ><Icon type="edit" /></Button>
        </Tooltip>,
          row.direction === 'out' ? row.paid_at ?
        <Tooltip title='Despesa Paga!'>
          <Button disabled={localStorage.getItem('@permission') !== 'finance' ? true : false } size="small" style={{marginLeft: '3px'}} type="primary"><FontAwesomeIcon icon={faHandHoldingUsd}></FontAwesomeIcon></Button>
        </Tooltip> :
        <Tooltip title='Pagar!'>
          <Button disabled={localStorage.getItem('@permission') !== 'finance' ? true : false } size="small" onClick={() => {
          paidExpense(row.id);
        }} style={{marginLeft: '3px'}} type="primary" ><FontAwesomeIcon icon={faHandHoldingUsd}></FontAwesomeIcon></Button>
        </Tooltip> : <Tooltip title='Receita não executa pagamentos'>
          <Button disabled={localStorage.getItem('@permission') !== 'finance' ? true : false } size="small" style={{marginLeft: '3px'}} type="primary"><FontAwesomeIcon icon={faHandHoldingUsd}></FontAwesomeIcon></Button>
        </Tooltip>,
        row.type !== "Mensalidades WIM" ?
        <Tooltip title='Excluir'>
        {row.installments_quantity > 1 ?
            <Popconfirm 
              title="Existe mais de uma parcela referente a esse registro, deseja excluir todos？" 
              okText="Sim" 
              cancelText="Não apenas essa!"
              onConfirm={() => onConfirmPop(row.id)}
              onCancel={() => onCancelPop(row.id)}
              >
              <Button disabled={localStorage.getItem('@permission') !== 'finance' ? true : false } size="small" style={{marginLeft: '3px'}} className="btn color-btn-delete" ><Icon type="close" /></Button>
            </Popconfirm>
            :
            <Button disabled={localStorage.getItem('@permission') !== 'finance' ? true : false} size="small" style={{marginLeft: '3px'}} onClick={() => {
              excludeExpense(row.id, false);
            }} className={ localStorage.getItem('@permission') !== 'finance' ? "color-btn-delete-disabled" : "btn color-btn-delete"} ><Icon type="close" /></Button>
          }
      </Tooltip> : <Tooltip title='Este Registro não pode ser excluído'>
        <Button size="small" style={{marginLeft: '3px'}} onClick={() => {
          excludeExpense(row.id);
        }} disabled={true}><Icon type="close" /></Button>
      </Tooltip>
      ]
    },
  ];

    return columns;
  }

  function onConfirmPop(id){

    excludeExpense(id, true);
  }

  function onCancelPop(id){
    excludeExpense(id, false);
  }

  function paidExpense(id){
    dispatch(paidExpenseRequest(id));
    setTimeout(() => {
      dispatch(clearRecipe());
      dispatch(getAllCashFlowRequest(start, end));
      dispatch(activesPendingRequest(start));
      dispatch(getRecipeRequest(start, end));
    }, 500);
  }

  function calcRecipe(direc){
    let calc = 0;
      if(direc === 'in'){
        dataSource.filter((item) => {
          if(item.direction === 'in') calc = calc + item.value;
        })
        return calc.toLocaleString('pt-br', {minimumFractionDigits: 2})
      }else {
        dataSource.filter((item) => {
          if(item.direction === 'out') calc = calc + item.value;
        })
        return calc.toLocaleString('pt-br', {minimumFractionDigits: 2})
      }
  }

  function excludeExpense(id, all){
    swal.fire({
      title: 'Confirmar Exclusão',
      text: 'Deseja realmente excluir esse registro? Esta ação é irreversivél!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Excluir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        dispatch(deleteExpenseRequest(id, all));
        setTimeout(() => {
          dispatch(clearRecipe());
          dispatch(getAllCashFlowRequest(start, end));
          dispatch(activesPendingRequest(start));
          dispatch(getRecipeRequest(start, end));
        }, 500);
      }
    })
  }

  function handleEditing(id){
    setExpenseEditingId(id);
    dispatch(getCashFlowEditingRequest(id));
  }

  function onChangePicker(values) {
    dispatch(clearRecipe());
    dispatch(clearActivesPending());
    setDataSource([]);
    if(values.length === 0) {
        setDataSource([]);
        dispatch(getAllCashFlowRequest(
        moment().startOf('month').format('YYYY-MM-DD'), 
        moment().endOf('month').format('YYYY-MM-DD')));

        return;
    }
    setStart(values[0]);
    setEnd(values[1]);

    dispatch(getAllCashFlowRequest(moment(values[0]).format('YYYY-MM-DD'), 
    moment(values[1]).format('YYYY-MM-DD')));
    dispatch(activesPendingRequest(values[0]));
    dispatch(getRecipeRequest(values[0], values[1]));
  }

  function onChangePickerPay(e){
    setPay(e);
    setDatePay(e);    
  }

  function showModal(){
    setValue(0);
    setModalVisible(true);
    setNewExpenses(true);
  }

  function handleCancel(){
    setModalVisible(false);
    setTimeout(() => {
      setNewExpenses(true);
      setValue(0);
    }, 500);
  };

  function showModalRecipe(){
    setModalVisibleRecipe(true);
    setNewExpenses(true);
  }

  function handleCancelRecipe(){
    setModalVisibleRecipe(false);
    setNewExpenses(true);
  };
  
function onChange(e) {
  setCheckValue(e.target.checked);
}

function onChangePlot(e) {
  setCheckValuePlot(e.target.checked);
  if(e.target.checked){
    setDisabledCheckBox(true);
  }else{
    setDisabledCheckBox(false);
  }
  
}

function onSubmitForm(){
  let expenses = {
    type: type,
    value: parseFloat(value),
    fixed: checkValue,
    is_installment: checkValuePlot,
    installments_quantity: plots ? plots : 0,
    pay_at: moment(datePay).format('YYYY-MM-DD'),
    direction: 'out',
    recurrent: recurrent
  }
  
  dispatch(newExpenseRequest(expenses));
  setStart(moment().startOf('month').format('YYYY-MM-DD'));
  setEnd(moment().endOf('month').format('YYYY-MM-DD'));
  setTimeout(() => {
    dispatch(clearRecipe());
    dispatch(getAllCashFlowRequest(start, end));
    dispatch(activesPendingRequest(start));
    dispatch(getRecipeRequest(start, end));
  }, 500);
  setModalVisible(false);
  setPlots();
  setType('');
  setValue();
  setCheckValue(false);
  setCheckValuePlot(false);
}

function onSubmitFormRecipe(data, { resetForm }){
  let recipe = {
    type: type,
    value: parseFloat(value),
    fixed: checkValue,
    is_installment: checkValuePlot,
    installments_quantity: 0,
    pay_at: moment(datePay).format('YYYY-MM-DD'),
    paid_at: moment(datePay).format('YYYY-MM-DD'),
    direction: 'in',
  }
  dispatch(newExpenseRequest(recipe));
  setStart(moment().startOf('month').format('YYYY-MM-DD'));
  setEnd(moment().endOf('month').format('YYYY-MM-DD'));
  setTimeout(() => {
    dispatch(clearRecipe());
    dispatch(getAllCashFlowRequest(start, end));
    dispatch(activesPendingRequest(start));
    dispatch(getRecipeRequest(start, end));
  }, 500);
  setModalVisibleRecipe(false);
} 

function onSubmitFormUpdate(){  
  let expenses = {
      type: type,
      value: parseFloat(value),
      fixed: checkValue,
      is_installment: checkValuePlot,
      installments_quantity: plots ? plots : 0,
      pay_at: datePay,
      direction: 'out',
      update_all_installments:false,
      recurrent: recurrent
    }
    dispatch(updateExpenseRequest(expenseEditingId, expenses));
    setStart(moment().startOf('month').format('YYYY-MM-DD'));
    setEnd(moment().endOf('month').format('YYYY-MM-DD'));
    setTimeout(() => {
      dispatch(clearRecipe());
      dispatch(getAllCashFlowRequest(start, end));
      dispatch(activesPendingRequest(start));
      dispatch(getRecipeRequest(start, end));
    }, 500);
    setModalVisible(false);
}

function onSubmitFormUpdatePlots(){  
  let expenses = {
      type: type,
      value: parseFloat(value),
      fixed: checkValue,
      is_installment: checkValuePlot,
      installments_quantity: plots ? plots : 0,
      direction: 'out',
      pay_at: datePay,
      update_all_installments:true,
      recurrent: recurrent
    }
    dispatch(updateExpenseRequest(expenseEditingId, expenses));
    setStart(moment().startOf('month').format('YYYY-MM-DD'));
    setEnd(moment().endOf('month').format('YYYY-MM-DD'));
    setTimeout(() => {
      dispatch(clearRecipe());
      dispatch(getAllCashFlowRequest(start, end));
      dispatch(activesPendingRequest(start));
      dispatch(getRecipeRequest(start, end));
    }, 500);
    setModalVisible(false);
}

function onSubmitFormRecipeUpdate(){
  let recipe = {
    type: type,
    value: parseFloat(value),
    fixed: checkValue,
    is_installment: checkValuePlot,
    installments_quantity: 0,
    direction: 'in',
  }
  dispatch(updateExpenseRequest(expenseEditingId, recipe));
  setStart(moment().startOf('month').format('YYYY-MM-DD'));
  setEnd(moment().endOf('month').format('YYYY-MM-DD'));
  setTimeout(() => {
    dispatch(clearRecipe());
    dispatch(getAllCashFlowRequest(start, end));
    dispatch(activesPendingRequest(start));
    dispatch(getRecipeRequest(start, end));
  }, 500);
  setModalVisibleRecipe(false);
} 

function onChangeType(e){
  setType(e.target.value);
}

function onChangeValue(e, value){
  setValue(value);
}

function onChangeRadio(e){
  if(e.target.value === 'b'){
    setRecurrent(2);
  } else if(e.target.value === 't'){
    setRecurrent(3);
  }else if(e.target.value === 's'){
    setRecurrent(6);
  }else if(e.target.value === 'a'){
    setRecurrent(12);
  }
}
  return [
    <Fragment>
    <Card title={
      <Row gutter={10}>
        <Col sm={{ span: 12 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{offset: 0, span: 8}} xxl={{offset: 0, span: 3}}className="title-clinics">
          <Icon type="credit-card" style={{fontSize: '20px', marginRight: '5px'}}/><span style = {{fontSize : '20px'}}>Fluxo de Caixa</span>
        </Col>
        <Col className = "margin-top-card" sm={{ offset:4,span: 12 }} md={{ offset: 2, span: 6 }} lg={{ offset: 4, span: 4 }} xl={{offset: 6, span: 4}} xxl={{offset: 14, span: 2}}>
          <div className="card-cash-flow-expense-out">
            <span className="content-card">Despesas: R$ {calcRecipe('out')}</span>
          </div>  
        </Col>
        <Col className = "margin-top-card" sm={{ offset: 4, span: 12 }} md={{ offset:5, span: 1 }} lg={{ offset: 4, span: 4 }} xl={{offset: 1, span: 4}} xxl={{offset: 1, span: 2}}>
          <div  className="card-cash-flow-expense" >
            <span className="content-card">Receita: R$ {calcRecipe('in')}</span>
          </div>
        </Col>
      </Row>
    }>
    <Row>
      <Col sm={{ offset:0 ,span: 5 }} md={{ offset:5, span: 6 }} lg={{ offset: 0, span: 5 }} xl={{offset: 0, span: 4}}  xxl={{offset: 0, span: 3}} className="title-clinics" >
          <Button type={'primary'} onClick={() => {
            setCheckValue(false);
            setCheckValuePlot(false);
            setPlots('');
            setValue(0);
            setType('');
            setNewExpenses(true);
            showModal();
          }}>Cadastrar Despesas</Button>&nbsp;
      </Col>
      <Col sm={{ offset:9 ,span: 5 }} md={{ offset:2, span: 6 }} lg={{ offset: 1, span: 5 }} xl={{offset: 0, span: 4}}  xxl={{offset: 0, span: 3}} className="title-clinics" >
          <Button type={'primary'} onClick={() => {
            setCheckValue(false);
            setCheckValuePlot(false);
            setPlots('');
            setValue(0);
            setType('');
            setTimeout(() => {
              setNewExpenses(true);
              showModalRecipe();
            }, 500);
            
          }}>Cadastrar Receita</Button>&nbsp;
        </Col>
        <Col sm={{ offset:0, span: 25 }} md={{ offset: 3, span: 18 }} lg={{ offset: 0, span: 18 }} xl={{offset: 2, span: 10}}  xxl={{offset: 4, span: 8}} className="title-clinics">
          <RangePicker style={{width: '100%'}}
            ranges={{
              Today: [moment(), moment()],
              'This Month': [moment().startOf('month'), moment().endOf('month')],
            }}
            separator="/"
            placeholder={["Início","Fim"]}
            format={"DD/MM/YYYY"}
            onChange={onChangePicker}
          />
        </Col>
      </Row>

      <br/>
      <DataTable 
        rowClassName={(record, index) => 
        record.direction === 'out' ? 
        moment(record.pay_at).format('DD/MM/YYYY') === moment().format('DD/MM/YYYY') ? 'row-warning-pay' 
          : moment(record.pay_at).format('DD/MM/YYYY') < moment().format('DD/MM/YYYY') && !record.paid_at ? 
          'row-danger-pay'  : record.paid_at ? 'row-success-pay' : '' 
        : record.direction === 'in_pending' && 'row-danger-pay'
        }
        Datasource={dataSource}
        loading={finance.loading}
        Columns={getColumns()}
        Placeholder="Procure pela Descrição"
      />
      </Card>
    </Fragment>,
    <Modal
      visible={modalVisible}
      title={ newExpenses ? 'Cadastrar Despesa' : 'Atualizar Despesa' }
      footer={null}
      onCancel={handleCancel}
    >     
      <Form 
        onSubmit={newExpenses ? onSubmitForm : onSubmitFormUpdate}
        style={{display: 'flex', flexDirection: 'column'}}
      >
        <label>Descrição da Despesa</label>
        <Input onChange={onChangeType} value={type} name='type'></Input>
        <label>Valor</label>
        <IntlCurrencyInput className="ant-input" onChange={onChangeValue} defaultValue={value} name='value'></IntlCurrencyInput>
        <br/>
        <Checkbox 
          onChange={onChangePlot}
          checked={checkValuePlot}
          style={{marginBottom: '8px'}}
        >
          Pagamento Parcelado
        </Checkbox>
        
        { checkValuePlot &&
          <Row>
            <Col md={{ span: 6 }} sm={{ span: 12 }} lg={{ span: 7 }}>
            <span >Número de parcelas:</span>
            </Col>
            <Col md={{ span: 6 }} sm={{ span: 12 }} lg={{ span: 12 }}>
              <InputNumber onChange={(value) => setPlots(value)} defaultValue={plots} name='plots'></InputNumber>
            </Col>
          </Row>
        }
        <div style={{marginTop:'3px'}}>
          <Checkbox 
            onChange={onChange}
            checked={checkValue}
            disabled = {disabledCheckBox}
          >
            Pagamento Recorrente
          </Checkbox>
        </div>
        <br/>
        {checkValue &&
          <div style={{marginBottom: '10px'}}>
            <Radio.Group onChange={onChangeRadio} defaultValue="" buttonStyle="solid">
              <Radio.Button value="b">Bimestral</Radio.Button>
              <Radio.Button value="t">Trimestral</Radio.Button>
              <Radio.Button value="s">Semestral</Radio.Button>
              <Radio.Button value="a">Anual</Radio.Button>
            </Radio.Group>
          </div>
        }
        <div className='margin-date-expenses' >
            <label>Data de Vencimento</label><br/>
            <DatePicker format='DD/MM/YYYY' onChange={onChangePickerPay} value={pay} />
        </div>
        <Divider></Divider>
        <div style={{display: 'flex', alignSelf: 'flex-end', marginTop: '5px'}}>
          <Button className='btn ant-btn-danger' onClick={handleCancel}>Cancelar</Button>&nbsp;
          {newExpenses ? 
            <Button htmlType='submit' className='btn ant-btn-primary'>Cadastrar</Button>
          : plots > 1 ? <Popconfirm
            title="Atualizar todas as parcelas?"
            onConfirm={onSubmitFormUpdatePlots}
            onCancel={onSubmitFormUpdate}
            okText="Sim"
            cancelText="Não, apenas essa!"
          ><Button htmlType='submit' className='btn ant-btn-primary'>Atualizar</Button></Popconfirm> : 
            <Button htmlType='submit' className='btn ant-btn-primary'>Atualizar</Button>
          }
          
        </div>
      </Form>

    </Modal>,
    <Modal
    visible={modalVisibleRecipe}
    title={ newExpenses ? 'Cadastrar Receita' : 'Atualizar Receita' }
    footer={null}
    onCancel={handleCancelRecipe}
  >
    <Form 
      onSubmit={newExpenses ? onSubmitFormRecipe : onSubmitFormRecipeUpdate} 
      style={{display: 'flex', flexDirection: 'column'}}
    >
      <label>Descrição da Receita</label>
      <Input onChange={onChangeType} value={type} name='type'></Input>
      <label>Valor</label>
      <IntlCurrencyInput className="ant-input" style={{marginBottom: '10px'}} onChange={onChangeValue} defaultValue={value} name='value'></IntlCurrencyInput>
      <div className='margin-date-expenses' >
      <label>Data de Vencimento</label><br/>
        <DatePicker format='DD/MM/YYYY' onChange={onChangePickerPay} value={pay} />
      </div>
      <Divider></Divider>
      <div  style={{display: 'flex', alignSelf: 'flex-end', marginTop: '5px'}}>
        <Button className='btn ant-btn-danger' onClick={handleCancelRecipe}>Cancelar</Button>&nbsp;
        <Button htmlType='submit' className='btn ant-btn-primary'>{newExpenses ? 'Cadastrar' : 'Atualizar' }</Button>
      </div>
    </Form>

  </Modal>
  ];
}
