import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSalesRequest, getSalesmanByIdRequest } from '../../store/actions/salesman.actions';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import { Modal, Row, Col, Spin, Divider, Button, Table } from 'antd';


export default function SalesmanSales(props) {
    const salesman = useSelector(state => state.salesman);
    const idSalesman = props.match.params.id;
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        dispatch(getAllSalesRequest(idSalesman));
        dispatch(getSalesmanByIdRequest(idSalesman));
    }, []);
    const numMouths = 6;
    const options = {
        scaleShowGridLines: true,
        scaleGridLineColor: 'rgba(0,0,0,.05)',
        scaleGridLineWidth: 1,
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: true,
        scales: {
            yAxes: [
                {ticks: {min: 0}}
            ]
        },
        bezierCurve: true,
        bezierCurveTension: 0.4,
        pointDot: true,
        pointDotRadius: 4,
        pointDotStrokeWidth: 1,
        pointHitDetectionRadius: 20,
        datasetStroke: true,
        datasetStrokeWidth: 2,
        datasetFill: true,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
      }

      
    function makeChartData(){
        const today = new Date();
        const dates = [];
        for(let i=0;i<numMouths;i+= 1){
            const date = new Date(today)
            dates.push(date);
            today.setMonth(new Date().getMonth() - (i+1));
        }
        dates.reverse()
        const labels = dates.map((d)=>{
            return d.toLocaleString('pt-br', { month: 'long' });
        })
        const dataPlus = dates.map((d)=>{
            const count = salesman.allSales.filter((s) => {
                if(s.plan_id === 2){
                    return new Date(s.created_at).getMonth() === d.getMonth() &&
                       new Date(s.created_at).getFullYear() ===d.getFullYear() &&
                       /plus/.test(s.plan_code); 
                }
                return false;
            }).length
            return count;
        })
        const dataPremium = dates.map((d)=>{
            const count = salesman.allSales.filter((s) => {
                if(s.plan_id === 3){
                    return new Date(s.created_at).getMonth() === d.getMonth() &&
                    new Date(s.created_at).getFullYear() ===d.getFullYear() &&
                    /premium/.test(s.plan_code); 
                }
                return false;
            }).length
            return count;
        })
        return {
            labels,
            datasets: [{
                label: 'Plus',
                data: dataPlus,
                backgroundColor:"#003D4C",
                borderColor:"#003D4C",
                fill:false         
            },
            {
                label: 'Premium',
                data: dataPremium,
                backgroundColor:"#3EC1CE",
                borderColor:"#3EC1CE",
                fill:false          
            }]
        }
    }
    const columns = [
        {
          title: 'Nome',
          dataIndex: 'name',
          key: 'user_id',
          defaultSortOrder: 'ascend',
          sorter: (a, b) => {return a.name.localeCompare(b.name)},
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'user_id',
        }
      ];
    function countActives(){
        let count = 0;
        salesman.allSales.forEach((s) => {
            const startDate = moment();
            const timeEnd = moment(s.end);
            const diff = timeEnd.diff(startDate, 'days');            
            if (diff >= 0 && !s.is_free_trial_subscription) {
                count+= 1;
            }
        });
        return count;
    }

    function countRecipe(){
        let recipe = 0;
        salesman.allSales.forEach((s) => {
            const startDate = moment();
            const timeEnd = moment(s.end);
            const diff = timeEnd.diff(startDate, 'days');            
            if (diff >= 0 && !s.is_free_trial_subscription) {
                recipe += parseFloat(s.paid_value);
            }
        });
        return recipe.toFixed(2);
    }

    function countFreeTrial(){
        let count = 0;
        salesman.allSales.forEach((s) => {
            const startDate = moment();
            const timeEnd = moment(s.end);
            const diff = timeEnd.diff(startDate, 'days');            
            if (diff >= 0 && s.is_free_trial_subscription) {
                count+= 1;
            }
        });
        return count;
    }
    return [
        <div className="screen">
            <Button style={{ float: "right" }} className="btn ant-btn-primary" onClick={() => {setModalVisible(true)}}> Vendas </Button>
            <h2>Vendedor: {salesman.selectedSalesman != null ? salesman.selectedSalesman.name : '' }</h2>
            <Divider className="margin-divider" />
            {salesman.loading && <div className="loading"><Spin /></div>}
            <div className="dashboard">
                <Row gutter={16}>
                    <Col md={{ span: 6 }} sm={{ span: 12 }}>
                        <div className="card card-clinics-graph">
                            <div className="card-header ">Total</div>
                            <div className="card-number">{salesman.allSales.length}</div>
                        </div>
                    </Col>
                    <Col md={{ span: 6 }} sm={{ span: 12 }}>
                        <div className="card card-active">
                            <div className="card-header">Ativos</div>
                            <div className="card-number">{countActives()}</div>
                        </div>
                    </Col>
                    <Col md={{ span: 6 }} sm={{ span: 12 }}>
                        <div className="card card-trial">
                            <div className="card-header">Trial</div>
                            <div className="card-number">{countFreeTrial()}</div>
                        </div>
                    </Col>
                    <Col md={{ span: 6 }} sm={{ span: 12 }}>
                        <div className="card card-recipe">
                            <div className="card-header">Receita</div>
                            <div className="card-number">{countRecipe()}</div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="grafico">
                <h3>Vendas nos ultimos 6 meses:</h3>
                <Row>
                    <Col md={{ span: 24 }} sm={{ span: 24 }}>
                    <Line data={makeChartData()}
                        options={options}
                        />
                    </Col>
                </Row>
            </div>
        </div>
        ,
        <Modal title="Vendas" visible={modalVisible} onOk={()=>{ setModalVisible(false) }} onCancel={()=>{ setModalVisible(false) }}>
            {
                <Table dataSource={salesman.allSales} columns={columns} />
            }
        </Modal>
    ]
}