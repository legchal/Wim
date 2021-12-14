/* eslint array-callback-return: 0 */ //--> OFF

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSalesRequest } from '../../store/actions/commission.actions';
import { Bar } from 'react-chartjs-2';
import { Row, Col, Card, Icon } from 'antd';


export default function Commissions() {
    const commission = useSelector(state => state.commission);
    const dispatch = useDispatch();
    //const [modalVisible, setModalVisible] = useState(false);
    const [sales, setSales] = useState([]);

    useEffect(() => {
        dispatch(getAllSalesRequest());
    }, []);

    useEffect(() => {
        setSales(commission.allSales);   
    }, [commission]);


    const options = {
        scaleShowGridLines: true,
        scaleGridLineColor: 'rgba(0,0,0,.05)',
        scaleGridLineWidth: 1,
        scales: {
            yAxes: [
                {ticks: {min: 0}},
            ],
            xAxes:[
                {
                    barPercentage: 0.1,
                }
            ]
        },
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
      }

      function removeDuplicated(a, s){
        let p, i, j;
        for(i = a.length; i;){
            for(p = --i; p > 0;)
                if(a[i] === a[--p]){
                    for(j = p; p-- && a[i] === a[p];);
                    i -= a.splice(p + 1, j - p).length;
                }
        }
        return a;
    };
    function contSales(s){
        let count = 0;
        sales.map(item => {
            if(item.vendedor === s) count++;
            return false;
        });

        return count;
    }

    function gera_cor(){
        var hexadecimais = '0123456789ABCDEF';
        var cor = '#';
      
        // Pega um número aleatório no array acima
        for (var i = 0; i < 6; i++ ) {
        //E concatena à variável cor
            cor += hexadecimais[Math.floor(Math.random() * 16)];
        }
        return cor;
    }

    function totalRecipe() {
        let total = 0;
        sales.map(item => {
            total += item.paid_value
        })
        return parseFloat(total.toFixed(2));
    }
 
    function makeChartData(){
        let vendedores = [];
        let a = sales.map(item => {
            return item.vendedor;
        });
        vendedores = removeDuplicated(a);

        const dataSets = [];
        

        vendedores.map((item, index) => {            
            let cor = gera_cor();
            let data = [];
            data.push(contSales(item));
            dataSets.push({
                label: item,
                data: data,
                backgroundColor: cor,
                borderColor: cor,
                fill:false 
            })
        })

        return {
            labels: ['Vendas'],
            datasets: dataSets
        }
    }

    
    return (
        <Card
            title={
                <Row gutter={16}>
                    <Col md={{ span: 6 }} sm={{ span: 12 }}>
                    <Icon type="line-chart" />
                    <span style={{fontSize:'20px', marginLeft:'5px'}}>Balanço de Comissões</span >
                    </Col>
                    <Col md={{ span: 6 }} sm={{ span: 12 }} lg={{ span: 6 }} className="card-position">
                        <div className="card-clinics card-clinics-manage">
                        <div className="card-clinics-header ">Vendas:&nbsp;{
                            sales.length
                        }</div>
                        </div>
                    </Col> 

                    <Col md={{span: 6}} sm={{span:12 }} lg={{span: 6}} className="card-position">
                        <div className="card-clinics card-clinics-atives">
                            <div className="card-clinics-header">Receita:&nbsp;{`R$ ${totalRecipe()}`}</div>
                        </div>
                    </Col>
                </Row>        
            }
        >
                <div className="screen">
                
                
                <div className="grafico">

                    <h3>Vendas</h3>
                    <Row>
                        <Col md={{ span: 24 }} sm={{ span: 24 }}>
                        <Bar data={makeChartData()}
                            options={options}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </Card>
    )
}