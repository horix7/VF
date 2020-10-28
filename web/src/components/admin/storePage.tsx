/* eslint-disable no-restricted-globals */
import React , { Component, Fragment } from 'react'
import Tables from '../data/product.tables'
import Chart from '../data/charts'
import { PrimaryButton ,IIconProps } from 'office-ui-fabric-react';
import {Icon } from '@fluentui/react/lib/Icon'
import ProductForm from '../forms/products'
import OrderTable from '../data/ordersTables'
import BackendCalls from '../../server/backendCalls'
import BackDrop from '../UI/backDrop'


const backend = new BackendCalls()
export default class StoreAdmin extends Component<any> {

    state = {
        openEditor: false,
        products: [],
        data2: [],
        data: [],
        doneLoading: false

    }

    
    async componentDidMount ( ) {
        const premiumData = await  backend.GetProducts()
 
        console.log(premiumData)
       this.setState({
           data: [...premiumData.data.products],
        doneLoading: true

       })
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

            {this.state.openEditor ? <ProductForm  goBack={this.openEditor} content={{}} categories={[]}  /> : <>
            <div className="towEl">
                <div className="actionBtn">
                <div></div>

            <div className="viewReport" onClick={() => location.href = "#orders"}>

             <Icon iconName="CRMReport" className="bigIcon" />
             <p>View Orders</p>
             </div>

             <div className="viewReport"  onClick={this.openEditor} >
             <Icon iconName="AddTo" className="bigIcon"/>
             <p>Create A Product</p>
             </div>
                </div>
             <Chart chartData={{ }}  type={"sales"}  />

           </div>
           <Tables data={this.state.data} />
            

            <div className="orders" id="orders">
               <OrderTable data={this.state.data2} />

            </div>
            </>}
        </Fragment>
       )
    }

}