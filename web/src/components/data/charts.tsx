import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 'monday', sales: 20,
  },
  {
    name: 'tuesday', sales: 200,
  },
  {
    name: 'wednsday', sales: 0,
  },
  {
    name: 'thursday', sales: 2,
  },
  {
    name: 'friday', sales: 20,
  },
  {
    name: 'saturday', sales: 22,
  },
  {
    name: 'sunday', sales: 39,
  },
];


export default class Chart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/nptzh7ez/';

  render() {
    return (
     <div className="chartHolder">
       <div className="spacing">

       </div>

       <LineChart
        width={700}
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
        <Line type="monotone" dataKey="sales" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
      </LineChart>

     </div>
    );
  }
}
