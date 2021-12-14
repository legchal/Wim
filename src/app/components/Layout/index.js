import React, { useState, useEffect, Fragment} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signOut } from '../../store/actions/session.actions';
import { useDispatch } from 'react-redux';
import { Layout, Menu, Breadcrumb, Icon, Popover, Button, Avatar } from 'antd';
import logoHead from './logo_head.png';
import defaultProfile from './profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandHoldingUsd,
  faChartLine,
  faMoneyCheckAlt,
  faFileSignature,
  faList,
  faCogs,
  faDownload
} from '@fortawesome/free-solid-svg-icons';
import { notification } from 'antd';
import socket from '../../config/socket';
import './styles.css';
import audio from '../../media/audioguitarra.mp3';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function SiderDemo(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [permission] = useState(localStorage.getItem('@permission'));
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('@permission') === 'developer') {
      socket.on('NewCalledNotification', called => {
        notification.open({
          placement: 'bottomRight',
          message: [<b> Novo Chamado </b>],
          description: [
            <div style={{ cursor: 'pointer' }}>
              <audio src={audio} autoPlay></audio>
              <span>
                {' '}
                <b>Motivo do Chamado:</b> {called.reason}
              </span>
              <br />
              <span>
                {' '}
                <b>Nome do usuário:</b> {called.user}
              </span>
              <br />
              <span>
                {' '}
                <b>E-mail do usuário:</b> {called.userEmail}
              </span>
              <br />
              <span>
                <b>ID do Usuário:</b> {called.userId}
              </span>
            </div>,
          ],
          style: {
            backgroundColor: '#d9d9d9',
          },
          onClick: () => {
            props.history.push('/called-list');
          },
        });
      });
    }
  }, [socket]);

  function VerifyFinanceOrSuper() {
    if (permission === 'super' || permission === 'finance' || permission === 'developer') {
      return true;
    }
    return false;
  }

  function VerifySuperOrSupportOrDeveloper() {
    if (
      permission === 'super' ||
      permission === 'support' ||
      permission === 'developer'
    ) {
      return true;
    }
    return false;
  }
  function VerifySuperOrDeveloper(){
    if(permission === 'super' || permission === 'developer'){
      return true;
    }
    return false;
  }
  function VerifyDeveloper(){
    if(permission === 'developer'){
      return true;
    }
    return false;
  }

  function logout() {
    dispatch(signOut());
    props.history.push('/');
  }

  function goToProfile() {
    props.history.push('/profile');
  }

  const contentPopUp = (
    <div>
      <Button
        block
        type="primary position-margin"
        onClick={() => goToProfile()}
      >
        Perfil
      </Button>
      <Button block type="danger" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );

  const textPopUp = (
    <Fragment>
      <div className="icon-foto-profile">
        <div onClick={() => goToProfile()} style={{ cursor: 'pointer' }}>
          <Avatar
            src={
              localStorage.getItem('@avatar')
                ? localStorage.getItem('@avatar')
                : defaultProfile
            }
          />
        </div>
      </div>
      <center>
        <span>{localStorage.getItem('@email')}</span>
      </center>
    </Fragment>
  );

  const onCollapse = menu => {
    setCollapsed(menu);
  };
  
  const [key, setKey] = useState('16');
  const [subGroup, setSubGroup] = useState('sub9');

  function SaveMenu(){
    switch(props.match.url){
      case '/revenues':
        setKey('2');
        setSubGroup('sub1');
        return ;
      case '/new-payers':
        setKey('2');
        setSubGroup('sub1')
        return ;
      case '/cash-flow':
        setKey('3');
        setSubGroup('sub1')
        return ;
      case '/salesman-register' :
        setKey('4')
        setSubGroup('sub2');
        return ;
      case '/salesman-list':
        setKey('5');
        setSubGroup('sub2')
        return ;
      case '/salesman-sales/' + props.match.params.id:
        setKey('5');
        setSubGroup('sub2')
        return ;
      case '/create-user':
        setKey('6')
        setSubGroup('sub3')
        return ;
      case '/list-users':
        setKey('7')
        setSubGroup('sub3')
        return ;
      case '/edit-user/' + props.match.params.id:
        setKey('7')
        setSubGroup('sub3')
        return ;
      case '/user-manage':
        setKey('8')
        setSubGroup('sub4')
        return ;
      case '/user-editing/' + props.match.params.id:
        setKey('8')
        setSubGroup('sub4')
        return ;
      case '/clinics-manage':
        setKey('9')
        setSubGroup('sub5')
        return ;
      case '/clinic-editing/' + props.match.params.id:
          setKey('9')
          setSubGroup('sub5')
          return ;
      case '/commissioning-list':
        setKey('10')
        setSubGroup('sub6')
        return ;
      case '/commission/info-salesman/' + props.match.params.id:
        setKey('10')
        setSubGroup('sub6')
        return ;
      case '/commission/sales/' + props.match.params.id:
          setKey('10')
          setSubGroup('sub6')
          return ;
      case '/balance-commission':
        setKey('11')
        setSubGroup('sub6')
        return ;
      case '/called-register':
        setKey('12')
        setSubGroup('sub7')
        return ;
      case '/called-list':
        setKey('13')
        setSubGroup('sub7')
        return ;
      case '/called-details/' + props.match.params.id:
        setKey('13')
        setSubGroup('sub7')
        return ;
      case '/generate-tickets':
        setKey('14')
        setSubGroup('sub8')
        return ;
      case '/ticket-list':
        setKey('15')
        setSubGroup('sub8')
        return ;
      case '/access-list':
        setKey('16')
        setSubGroup('sub9')
        return ;
      case '/register-logs':
          setKey('17')
          setSubGroup('sub10')
          return ;
      case '/update-system':
        setKey('18')
        setSubGroup('')
        return ;
      default:
        setKey('1');
        setSubGroup('');
        return ;
    }
  }
  useEffect(() => {

    SaveMenu();
  }, [props.match.url])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu 
          theme="dark"
          defaultSelectedKeys={[key]}
          selectedKeys = {[key]}
          openKeys = {[subGroup]}
          defaultOpenKeys={[subGroup]} 
          mode="inline" 
          >
          {/* <Menu.Item key="1">
            <Link to="/dashboard-adm">
              <Icon type="pie-chart" />
              <span> Dashboard </span>
            </Link>
          </Menu.Item> */}
          {VerifyFinanceOrSuper() && (
            <SubMenu onTitleClick = {() => (subGroup === 'sub1' ?  setSubGroup('1')  : setSubGroup('sub1'))} 
              key="sub1" 
              title={
                <span>
                  <Icon type="user" />
                  <span style = {{marginLeft : '4px'}}>Financeiro</span>
                </span>
              }
            >
              <Menu.Item key="2" >
                <Link to="/revenues">
                  <FontAwesomeIcon icon={faChartLine}></FontAwesomeIcon>
                  <span style= {{marginLeft : '4px'}}> Faturamento </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3" >
                <Link to="/cash-flow">
                  <FontAwesomeIcon icon={faMoneyCheckAlt}></FontAwesomeIcon>
                  <span style = {{marginLeft : '4px'}}> Fluxo de Caixa </span>
                </Link>
              </Menu.Item>
            </SubMenu>
          )}
          { VerifySuperOrDeveloper() && (
            <SubMenu onTitleClick = {() => (subGroup === 'sub2' ? setSubGroup('1') : setSubGroup('sub2'))}
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span style={{ marginLeft: '4px' }}>Vendedores</span>
                </span>
              }
            >
              <Menu.Item key="4" >
                <Link to="/salesman-register">
                  <Icon type="user-add" />
                  <span> Criar Vendedor </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="5" onClick = {() => {setKey('5'); setSubGroup('sub2')}}>
                <Link to="/salesman-list">
                  <Icon type="usergroup-add" />
                  <span> Listar </span>
                </Link>
              </Menu.Item>
            </SubMenu>
          )}
          {VerifySuperOrDeveloper() && (
            <SubMenu onTitleClick = {() => (subGroup === 'sub3' ? setSubGroup('1') : setSubGroup('sub3'))}
              key="sub3"
              title={
                <span>
                  <Icon type="block" /> <span> Controlar Acessos </span>
                </span>
              }
            >
              <Menu.Item key="6" >
                <Icon type="user-add" />
                <span style = {{marginLeft : '4px'}}> Criar Usuários </span>
                <Link to="/create-user" />
              </Menu.Item>
              <Menu.Item key="7" >
                <Icon type="unordered-list" />
                <span style = {{marginLeft : '4px'}} > Listar Usuários </span>
                <Link to="/list-users" />
              </Menu.Item>
            </SubMenu>
          )}
          {VerifySuperOrSupportOrDeveloper() && (
            <SubMenu onTitleClick = {() => (subGroup === 'sub4' ? setSubGroup('1') : setSubGroup('sub4'))}
              key="sub4"
              title={
                <span>
                  <Icon type="user" />
                  <span style={{ marginLeft: '4px' }}>Usuários</span>
                </span>
              }
            >
              <Menu.Item key="8" >
                <Icon type="setting" />
                <span> Administrar </span>
                <Link to="/user-manage" />
              </Menu.Item>
            </SubMenu>
          )}
          {VerifySuperOrSupportOrDeveloper() && (
            <SubMenu onTitleClick = {() => (subGroup === 'sub5' ?  setSubGroup('1') : setSubGroup('sub5'))}
              key="sub5"
              title={
                <span>
                  <Icon type="home" /> <span> Clínicas </span>
                </span>
              }
            >
              <Menu.Item key="9" >
                <Icon type="setting" /><span>Administrar </span>
                <Link to="/clinics-manage" />
              </Menu.Item>
            </SubMenu>
          )}
          { VerifySuperOrDeveloper() && (
            <SubMenu onTitleClick = {() =>(subGroup === 'sub6' ? setSubGroup('1') : setSubGroup('sub6'))}
              key="sub6"
              title={
                <span>
                  <Icon type="dollar" /> <span> Comissionamento </span>
                </span>
              }
            >
              <Menu.Item key="10" >
                <FontAwesomeIcon icon={faHandHoldingUsd}></FontAwesomeIcon>
                <span style = {{marginLeft : '4px'}}> Comissões </span>
                <Link to="/commissioning-list" />
              </Menu.Item>
              <Menu.Item key="11">
                <Icon type="line-chart" />
                <span > Balanço </span>
                <Link to="/balance-commission" />
              </Menu.Item>
            </SubMenu>
          )}
          {VerifySuperOrSupportOrDeveloper() && (
            <SubMenu onTitleClick = {() => (subGroup === 'sub7' ? setSubGroup('1') : setSubGroup('sub7'))}
              key="sub7"
              title={
                <span>
                  <Icon type="phone" /> <span > Chamados </span>
                </span>
              }
            >
              <Menu.Item key="12">
                <FontAwesomeIcon icon={faFileSignature}></FontAwesomeIcon>
                <span style = {{marginLeft : '4px'}}> Cadastrar </span>
                <Link to="/called-register" />
              </Menu.Item>
              <Menu.Item key="13">
                <FontAwesomeIcon icon={faList}></FontAwesomeIcon>
                <span style = {{marginLeft : '4px'}} > Listar </span>
                <Link to="/called-list" />
              </Menu.Item>
            </SubMenu>
          )}
          {VerifySuperOrSupportOrDeveloper() && (
            <SubMenu onTitleClick = {() => (subGroup === 'sub8' ? setSubGroup('1') : setSubGroup('sub8'))}
              key="sub8"
              title={
                <span>
                  <Icon type="idcard" /><span> Tickets </span>
                </span>
              }
            >
              <Menu.Item key="14" >
                <FontAwesomeIcon icon={faCogs}></FontAwesomeIcon>
                <span style = {{marginLeft : '4px'}}> Gerar </span>
                <Link to="/generate-tickets" />
              </Menu.Item>
              <Menu.Item key="15" >
                <FontAwesomeIcon icon={faList}></FontAwesomeIcon>
                <span style = {{marginLeft : '4px'}}> Listar </span>
                <Link to="/ticket-list" />
              </Menu.Item>
            </SubMenu>
          )}
          { VerifySuperOrSupportOrDeveloper() && (
            <SubMenu onTitleClick = {() => (subGroup === 'sub9' ? setSubGroup('1'):setSubGroup('sub9'))}
              key="sub9"
              title={
                <span>
                  <Icon type="fund" /> <span>Acessos</span>
                </span>
              }
            >
              <Menu.Item key="16">
                <FontAwesomeIcon icon={faList}></FontAwesomeIcon>
                <span style = {{marginLeft : '4px'}}> Logs de Acessos </span>
                <Link to="/access-list" />
              </Menu.Item>
            </SubMenu>
          )}
          { VerifyDeveloper() && (
            <SubMenu onTitleClick = {() => (subGroup === 'sub10' ? setSubGroup('1') : setSubGroup('sub10'))}
              key="sub10"
              title={
                <span>
                  <Icon type="database" /> <span>Registros</span>
                </span>
              }
            >
              <Menu.Item key="17">
                <FontAwesomeIcon icon={faList}></FontAwesomeIcon>
                <span style = {{marginLeft : '4px'}}> Logs </span>
                <Link to="/register-logs" />
              </Menu.Item>
            </SubMenu>
          )}
          { VerifyDeveloper() && (
          <Menu.Item key="18">
           <Link to="/update-system">
           <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
             <span> Atualizações </span>
           </Link>
         </Menu.Item>
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <img height="100%" alt="LogoHead" src={logoHead} />
          <Popover
            placement="bottomRight"
            title={textPopUp}
            content={contentPopUp}
            trigger="click"
            style={{ background: '#001529'}}
          >
            <Button style={{ float: 'right', margin: 12, background: '#002140', color: 'silver'}}>
              <Icon type="user" />
            </Button>
          </Popover>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Wim Smart Software ©2021
        </Footer>
      </Layout>
    </Layout>
  );
}

Layout.propTypes = {
  props: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
    children: PropTypes.element.isRequired,
  }),
};
