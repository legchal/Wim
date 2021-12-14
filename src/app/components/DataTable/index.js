import React, { useState, useEffect, Fragment} from 'react';
import { Input, Icon, Button, Table, Row, Col } from  'antd';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const { Search } = Input;

export default function DataTable({ Datasource, Columns, Loading, calledSource, suggestionsSource, Placeholder, notSearch, ...rest}) {
  const [dataSource, setDataSource] = useState(Datasource);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setDataSource(Datasource);
  }, [Datasource])
  
  function removeAcento (text){     
    text = text.toLowerCase();                                                         
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    return text;                 
  }

  function onChangeSearch(val) {
    if(val === '') {
      setDataSource(Datasource); 
      setSearchValue('');
      return;
    }

    let datasourceSearch = dataSource.filter(item => {
        let value = item.name ? item.name.toLowerCase() : '';
        let value2 = item.email ? item.email.toLowerCase() : '';
        let value3 = item.type ? item.type.toLowerCase() : '';
        let value4 = item.id ? item.id : null;
        let value5 = item.social_reason ? item.social_reason.toLowerCase() : '';
        let value6 = item.fantasy_name ? item.fantasy_name.toLowerCase() : '';
        let value7 = item.title ? item.title.toLowerCase() : ''
        
        if(removeAcento(value).indexOf(val.toLowerCase()) !== -1 ||
          value.indexOf(val.toLowerCase()) !== -1 ||
          removeAcento(value2).indexOf(val.toLowerCase()) !== -1 ||
          value2.indexOf(val.toLowerCase()) !== -1 ||
          removeAcento(value3).indexOf(val.toLowerCase()) !== -1 ||
          value3.indexOf(val.toLowerCase()) !== -1 ||
          value4 === parseInt(val) ||
          removeAcento(value5).indexOf(val.toLowerCase()) !== -1 ||
          value5.indexOf(val.toLowerCase()) !== -1 ||
          removeAcento(value6).indexOf(val.toLowerCase()) !== -1 ||
          value6.indexOf(val.toLowerCase()) !== -1 ||
          removeAcento(value7).indexOf(val.toLowerCase()) !== -1 ||
          value7.indexOf(val.toLowerCase()) !== -1

           ) {
          return item;
        }
        return false;
    });

    if(datasourceSearch.length === 0) {
      toast.error('Não foi encontrado nenhum registro!');
    }else{
      setDataSource(datasourceSearch);
    }
  }

  function resetDataSource(){
      if(calledSource){
        setDataSource(calledSource)
        setSearchValue('');
      }if(suggestionsSource){
        setDataSource(suggestionsSource)
        setSearchValue('');
      }
      else{
        setDataSource(Datasource); 
        setSearchValue('');
      }
  }
  return (
    <Fragment>
      {
        !notSearch &&
        (<Fragment>
          <Row>
            <Col span={ 21 }>
              <Search 
                placeholder={Placeholder} 
                value={searchValue} 
                onChange={(e) => {
                  setDataSource(Datasource) 
                  setSearchValue(e.target.value);
                  if(e.target.value === '') {
                    setDataSource(Datasource);
                  }
                }} 
                onSearch={(val) => onChangeSearch(val)} 
                enterButton 
                style={{ width: '100%' }} 
              /> 
            </Col>
              <Col span={ 1 } style={{ marginLeft: '2rem'}}>
                  <Button 
                    className="btn ant-btn-primary" 
                    onClick={() => {
                      resetDataSource()
                    }}
                  > 
                    <Icon type="rest" />&nbsp;Limpar 
                </Button>
              </Col>
          </Row>
        </Fragment>)
      }
      <Table 
        style={{ marginTop: '22px', overflowY: 'auto'}}
        columns={Columns}
        dataSource={dataSource}
        loading={Loading}
        {...rest}
      />
    </Fragment>
  );
}

DataTable.propTypes = {
  DataSource: PropTypes.array.isRequired,
  Columns: PropTypes.object.isRequired,
  Loading: PropTypes.bool
}
