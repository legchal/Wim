import React, { useEffect, useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { Form } from '@rocketseat/unform';
import { createSalesmanRequest } from '../../store/actions/salesman.actions';
import { Button, Card, Radio, Row, Col, Input, Icon} from 'antd';
import InputUnform from '../../components/InputUnform';
import { toast } from 'react-toastify';


export default function SalesmanRegister({ history }) {
  const dispatch = useDispatch();
  const sales = useSelector(state => state.salesman );
  const [radioValue, setRadioValue] = useState('');
  const [result, setResult] = useState(undefined);
  const [cpf, setCPF] = useState('');
  const [cep, setCep] = useState('');

  function mCPF(cpf){
    cpf=cpf.replace(/\D/g,"")
    cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
    setCPF(cpf);
  }
  function mCEP(cep){
    cep=cep.replace(/\D/g,"")
    cep=cep.replace(/^(\d{2})(\d)/,"$1.$2")
    cep=cep.replace(/\.(\d{3})(\d)/,".$1-$2")
    setCep(cep);
  }

  async function handleSubmit(data) {
    if(data.name === ""){
      toast.error('Digite o Nome do vendedor!');
      return;
    }else
    if(data.email === ""){
      toast.error('Digite o E-mail do vendedor!');
      return;
    }else
    if(data.password === ""){
      toast.error('Digite uma senha!');
      return;
    }else
    if(data.mobile === ""){
      toast.error('Digite um número de celular!');
      return;
    }else
    if(cpf === ""){
      toast.error('Digite um CPF!');
      return;
    }
    data = { ...data, cpf, cep, bank_account_type: radioValue.value };
    dispatch(createSalesmanRequest(data));
  }

  useEffect(() => {
    if(sales.createdSalesman.newSalesman !== undefined) {
      setResult(sales.createdSalesman.newSalesman);
    }
    if(result !== undefined) {
      setTimeout(() => {
        history.push('salesman-list');
        setResult(undefined);
      }, 1000);
    }
  }, [sales, result]);

  return (
    <Card 
      title= {
        <Row>
          <Icon  type="user-add" style = {{fontSize :'20px'}}/> <span style = {{fontSize : '20px'}}>Cadastro Vendedor</span>
        </Row>
        }
    >
      <br />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24, offset: 0 }} lg={{ span: 8, offset: 0 }} className="margin-col">
            <h1 style={{ textAlign: 'center' }}>Dados Pessoais</h1>
            <InputUnform contentLabel={'Nome:'} nameInput={'name'}></InputUnform>
            <InputUnform contentLabel={'E-mail:'} nameInput={'email'}></InputUnform>
            <InputUnform contentLabel={'Senha:'} nameInput={'password'} type="password"></InputUnform>
            <InputUnform contentLabel={'Celular:'} nameInput={'mobile'}></InputUnform>
            <label className="label-contentLabel2" style={{ float: "left" }}>CPF:</label>
            <Input onChange={(e) => mCPF(e.target.value)} value={cpf} placeholder={"000.000.000-00"} maxLength={14} className="register-called"/>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24, offset: 0 }} lg={{ span: 8, offset: 0 }} className="margin-col">
            <h1 style={{ textAlign: 'center' }}>Endereço</h1>
            <InputUnform contentLabel={'Rua:'} nameInput={'rua'}></InputUnform>
            <InputUnform contentLabel={'Número:'} nameInput={'numero'}></InputUnform>
            <InputUnform contentLabel={'Bairro:'} nameInput={'bairro'}></InputUnform>
            <label className="label-contentLabel2" style={{ float: "left" }}>CEP:</label>
            <Input onChange={(e) => mCEP(e.target.value)} value={cep} placeholder={"00000-000"} maxLength={10} className="register-called"/>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24, offset: 0 }} lg={{ span: 8, offset: 0 }} className="margin-col">
            <h1 style={{ textAlign: 'center' }}>Dados Pessoais</h1>
            <InputUnform contentLabel={'Banco:'} nameInput={'bank_name'}></InputUnform>
            <InputUnform contentLabel={'Agência:'} nameInput={'bank_agency'}></InputUnform>
            <InputUnform contentLabel={'Conta:'} nameInput={'bank_account_number'}></InputUnform>
            <br />
            <label> Tipo de Conta: </label>
            <Radio.Group onChange={value => setRadioValue(value)}>
              <Radio value="corrente">Corrente</Radio>
              <Radio value="poupançca">Poupança</Radio>
            </Radio.Group>
            <br /><br />
            <Button size={'large'} type="primary" htmlType="submit">
              Cadastrar
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}
