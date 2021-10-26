import React,{useEffect,useState} from 'react';
import '../App.css';
import fetch from '../app/helper/SeedData';
import {getPointsByCustMonth,getTotalPointsByCust} from '../app/helper/HelperFunctions';
import {tableIcons} from '../app/helper/IconRefs';
import MaterialTable from 'material-table';
import {useHistory} from 'react-router-dom';

function MainPage() {
    const history = useHistory();
    const [totalPointState,setTotalPointState] = useState(null)
    const [pointByMth,setPointByMth] = useState(null)
    useEffect(() => { 
      //We are fetching data from saple data, We can call API url here to get data from server.
      fetch().then((data)=> {
        setTotalPointState(getTotalPointsByCust(data));
        setPointByMth(getPointsByCustMonth(data));
      });
    },[]);
  
    //Format data to pass to table component
    let getTableData=()=>{
        let columns=[
          { title: 'Name', field: 'name'},
          { title: 'Month', field: 'month'},
          { title: 'Points', field: 'points'},
        ];
        let data=[];
        pointByMth.forEach((o)=>{
          data.push({name:o.name,month:o.month,points:o.points,details:o.transDetail})
        })
        return {columns,data}
    };
    console.log(pointByMth);
    return (
        <>
        {!!totalPointState && !!pointByMth ? 
        <div className="main-container">
            <h3>Total points by customer</h3>
            <div className="total-point-container">
                {totalPointState.map((o,index)=>(
                    <div className="card total-card">
                       <h3>{o.name}</h3>
                    <h4>{`Total Points : ${o.points}`}</h4>
                    </div>
                ))} 
            </div>
            <h3>Points in each month</h3>
            <div style={{ maxWidth: '100%' }}>
                <MaterialTable
                 actions={[
                    {
                      icon: tableIcons.Visibility,
                      tooltip: 'Save User',
                      onClick: (event, rowData) => {
                        history.push({
                          pathname: '/details',
                          state: { name:rowData.name,month:rowData.month,detail: rowData.details}
                        })
                      }
                    }
                  ]}
                icons={tableIcons}
                columns={getTableData().columns}
                data={getTableData().data}
                title=""
                />
            </div>
        </div>
        :
        <span>Loading...</span>
        }
        </>
    );
  }
  
  export default MainPage;