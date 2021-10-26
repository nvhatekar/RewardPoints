import React,{useEffect,useState} from 'react';
import '../App.css';
import fetch from '../app/helper/SeedData';
import {getPointsByCustMonth,getTotalPointsByCust} from '../app/helper/HelperFunctions';
import {tableIcons} from '../app/helper/IconRefs';
import MaterialTable from 'material-table';
import {useLocation} from 'react-router-dom';

function DetailPage(props) {
    
    const location = useLocation();
    console.log(location.state);
    //Format data to pass to table component
    let getTableData=()=>{
        let columns=[
          { title: 'Date', field: 'date'},
          { title: 'Amount', field: 'amount'},
          { title: 'Points', field: 'points'},
        ];
        let data=[];
        location.state.detail.forEach((o)=>{
          data.push({date:o.tDate,amount:o.tAmount,points:o.tPoints})
        })
        return {columns,data}
    };

    return (
        <div style={{padding:20}}>
        <h3>Transaction Details</h3>
        <h4>{`Name : ${location.state.name}`}</h4>
        <h4>{`Month : ${location.state.month}`}</h4>
            <div style={{ maxWidth: '100%' }}>
                <MaterialTable
                icons={tableIcons}
                columns={getTableData().columns}
                data={getTableData().data}
                title=""
                />
            </div>
        
        </div>
    );
  }
  
  export default DetailPage;