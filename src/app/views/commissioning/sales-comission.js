import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../components/DataTable';
import { getSalesmanSalesRequest } from '../../store/actions/commission.actions';
import { Card } from 'antd';



export default function SalesSalesman({ match }) {

    const dispatch = useDispatch();
    const commission = useSelector(state => state.commission);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        dispatch(getSalesmanSalesRequest(match.params.id));
    }, []);

    useEffect(() => {
        if(commission.SelasmanSales !== null){
            setDataSource(commission.SalesmanSales);
        }
    }, [commission]);
    
    function getColumns () {    

        const columns =[{
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => {return a.name.localeCompare(b.name)},
        },{
            title: 'Clinica',
            dataIndex: 'fantasy_name',
            key: 'fantasy_name'
        },{
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },{
            title: 'Valor',
            dataIndex: 'paid_value',
            key:'paid_value'
        }];

        return columns;
    }
    
    return(
        <Fragment>
            <Card
                title={<h1>Vendas do {commission.SalesmanSales.length > 0 ? commission.SalesmanSales[0].vendedor : ''}</h1>}
            >
                <DataTable 
                    Datasource={dataSource}
                    Loading={commission.loading}
                    Columns={getColumns()}
                    Placeholder="Pesquise por Nome ou E-mail"
                />
            </Card>
        </Fragment>
    );
}