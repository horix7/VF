/* eslint-disable no-restricted-globals */
import React , { Component, Fragment } from 'react'
import Tables from '../data/product.tables'
import Chart from '../data/charts'
import {Icon } from '@fluentui/react/lib/Icon'
import ProductForm from '../forms/products'
import MealForm from '../forms/ceateMealPlan'
import OrderTable from '../data/ordersTables'
import BackendCalls from '../../server/backendCalls'
import BackDrop from '../UI/backDrop'
import { stat } from 'fs'



const backend = new BackendCalls()
export default class StoreAdmin extends Component<any> {

    state = {
        openEditor: false,
        openPlan: false,
        products: [],
        content: {},
        orders: [],
        meal: [],
        data: [],
        doneLoading: false

    }

    getProductData = async() => {
        this.setState({
            doneLoading: false 
        })
          
        const premiumData = await  backend.GetProducts()
        const MealDatat = await  backend.getMealPlans()
        console.log(MealDatat)
        const Orders = await  backend.GetAllOrders()
 
       this.setState({
           data: [...premiumData.data.products],
           orders: [...Orders.data.products],
        //    meal: [...MealDatat.data.products],
           doneLoading: true

       })
    }
    
    async componentDidMount ( ) {
        this.getProductData()
      
    }

    deleteProduct =  (deleteItems: any) => {

        this.setState({
            doneLoading: false
        })

         deleteItems.forEach(async (element: any) => {
          await backend.deleteProduct(element)

        });

      
        this.getProductData()

    }

    getOneProduct = async (id: any) => {

        this.setState({
            doneLoading: false
        })


           const content =  await backend.GetOneProducts(id)


           this.setState({
               content: {...content.data.products.data , id: content.data.products.id},
               doneLoading: true
           })

           this.openEditor()
    }


    openEditor = () => {
        const { openEditor } = {...this.state}
        this.setState( {
            openEditor: !openEditor
        })

        if(openEditor) {
            this.setState({
                content: {}
            })

            this.getProductData()
        }
        

    }

    openPlan = () => {
        const { openPlan } = {...this.state}
        this.setState( {
            openEditor: !openPlan
        })

        if(openPlan) {
            this.setState({
                meal: {}
            })

            this.getProductData()
        }
        

    }


    render () {

                    
       return  (
        <Fragment>
            {this.state.doneLoading ? null : <BackDrop /> }

            {this.state.openPlan ? 
            <MealForm goBack={this.openPlan} content={this.state.meal} />
             : null }
            

            {this.state.openEditor ?
             <ProductForm  goBack={this.openEditor} content={this.state.content} categories={[...new Set(this.state.data.map((elem: any) => elem.category))].map((elem) =>  {return  {key: elem, text: elem}})}  /> : <>
           
           
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
            <div className="viewReport"  onClick={this.openPlan} >
             <Icon iconName="EatDrink" className="bigIcon"/>
             <p>Create A Meal Plan </p>
            </div>
             <Chart chartData={{ }}  type={"sales"}  />

           </div>
           <Tables data={this.state.data} editContent={(id: any ) => this.getOneProduct(id)} deleteContents={(ids : any ) => this.deleteProduct(ids)} />
            

            <div className="orders" id="orders">
               <OrderTable data={this.state.orders} />

            </div>
            </>}
        </Fragment>
       )
    }

}