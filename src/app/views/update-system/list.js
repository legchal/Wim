import React, { useEffect, useState, Fragment } from 'react';
import { Card, Row, Button, DatePicker} from 'antd';
import ModalSystemUpdate from './modal-create-update';
import { useDispatch, useSelector } from 'react-redux';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from '../../components/DataTable';
import moment from 'moment';
import {updateSystem} from '../../services/system-update';
import { getUpdateSystemRequest} from '../../store/actions/update-system.actions';


export default function UpdateSystem() {
  const dispatch = useDispatch();
  const UpdateSystem = useSelector(state => state.log.updateSystem);
  
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalDetails, setModalDetails] = useState(false);
  const { RangePicker } = DatePicker;

  async function getUpdateSystem(){
    setLoading(true);
    const getUpdate = await updateSystem();
    setDataSource(getUpdate.update_system);
    setLoading(false);
  } 


  useEffect(() => {
    getUpdateSystem();
  }, []);


  function getColumns(){
    const columns = [
      {
        title: 'Título',
        dataIndex: 'title',
        key: 'title',
        defaultSortOrder: 'ascend',        
        align: 'left',
      },
      {
        title: 'Data da Atualização',
        render: (row) => {
          return ( 
            moment(row.created_at).format('DD/MM/YYYY')
          );
        },
        align: 'center'
      },
      {
        title: 'Descrição',
        dataIndex: 'description',
        key: 'description',
        align: 'center',
      }]
    
    return columns;
  }
  function onChangePicker(values) {
    console.log(values);
    if(values.length === 0) {
      dispatch(getUpdateSystemRequest(
        moment().startOf('week').format('YYYY-MM-DD'), 
        moment().endOf('week').format('YYYY-MM-DD')));
        return;
    }
    dispatch(getUpdateSystemRequest(
      values[0].format('YYYY-MM-DD'), values[1].format('YYYY-MM-DD'))
    );
  }


  useEffect(() => { 
    dispatch(getUpdateSystemRequest(
      moment().startOf('week').format('YYYY-MM-DD'), 
      moment().endOf('week').format('YYYY-MM-DD')));
  },[]);


  useEffect(() => {
    if(UpdateSystem && UpdateSystem.data){
      setDataSource(UpdateSystem.data.updateSystem);
    }
  },[UpdateSystem]);


  return (
    <Fragment>      
      <Card
        title={
          <Row>
            <FontAwesomeIcon icon={faDownload} style={{ marginTop:'15px' }}/><span style={{fontSize:'20px', marginLeft:'5px', marginTop:'5px'}} > Atualizações </span>
            <Button 
              size={'large'} 
              type="primary" 
              htmlType="submit"
              className="btn btn-att btn-update-system"
              style = {{ float:'right',  }} 
              onClick={() => setModalDetails(true)}
            >
              Criar Atualização
            </Button>
          </Row>
        }
      >
        <center>
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
        <br></br>
        <DataTable 
          Datasource={dataSource}
          Columns={getColumns()}
          Loading={loading}
          Placeholder="Procure pelo Título"
        />        
      </Card>
      <ModalSystemUpdate modalVisible={modalDetails} setmodalVisible={setModalDetails} getUpdateSystem={getUpdateSystem}/>
    </Fragment>
  );
}
