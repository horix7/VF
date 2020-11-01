import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';




export default class Chart extends PureComponent<any> {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/nptzh7ez/';

  render() {

    
const dayz = [ "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
let data: any[]= [] 

if(this.props.type === "sales") {
 data =  dayz.map((element: any) => {
    return {
      name: element, sales: this.props.chartData[element] || 0
    }
  })
} else if(this.props.type === "views"){
  data = dayz.map((element: any) => {
    return {
      name: element, views: this.props.chartData[element] || 0
    }
  })
}



    return (
     <div className="chartHolder">
       <div className="spacing">

       </div>

         {window.matchMedia("(max-width: 700px)").matches ?
          <LineChart
          width={380}
          height={200}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeDasharray="5 5" />
          <Line type="monotone" dataKey={this.props.type} stroke="#82ca9d" strokeDasharray="3 4 5 2" />
        </LineChart> : <LineChart
        width={550}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeDasharray="5 5" />
        <Line type="monotone" dataKey={this.props.type} stroke="#82ca9d" strokeDasharray="3 4 5 2" />
      </LineChart>}
 
     </div>
    );
  }
}
