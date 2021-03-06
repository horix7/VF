/* eslint-disable no-restricted-globals */
import React , { Component, Fragment } from 'react'
import Chart from '../data/charts'
import OrderTable from '../data/ordersTables'
import BackendCalls from '../../server/backendCalls'
import BackDrop from '../UI/backDrop'
import FinanceData from '../UI/financeDataDisplay'

const backend = new BackendCalls()
export default class StoreAdmin extends Component<any> {

    state = {
        openEditor: false,
        products: [],
        doneLoading: false,
        data2: [],
        data1: [],
        data: []
    }

    
     getAllData = async () => {
        const premiumData = await  backend.GetProducts()
        const premiumData2 = await  backend.GetAllOrders()
        
       this.setState({
           data: [...premiumData.data.products],
           data2: [...premiumData2.data.products],
        doneLoading: true

       })
    }

    componentDidMount() {
        this.getAllData()
    }

    openEditor = () => {
        const { openEditor } = {...this.state}
        this.setState( {
            openEditor: !openEditor 
        })
    }
    render () {

                    
       return  (
        <Fragment>
           {this.state.doneLoading ? null : <BackDrop /> }

            <div className="towEl">
                <div className="actionBtn">
                <div></div>

                <FinanceData /> 
                </div>
             <Chart chartData={{ }}  type={"sales"}  />

           </div>            

            <div className="orders" id="orders">
                <h1>new SubScribers</h1>
               <OrderTable data={this.state.data1} />

                <h1>Store Orders</h1>
               <OrderTable data={this.state.data2} />

            </div>
        </Fragment>
       )
    }

}