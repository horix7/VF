/* eslint-disable no-restricted-globals */
import React , { Component, Fragment } from 'react'
import Tables from '../data/product.tables'
import Chart from '../data/charts'
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
        content: {},
        data: [],
        doneLoading: false

    }

    getProductData = async() => {
        this.setState({
            doneLoading: false 
        })
          
        const premiumData = await  backend.GetProducts()
 
       this.setState({
           data: [...premiumData.data.products],
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
    render () {

                    
       return  (
        <Fragment>
            {this.state.doneLoading ? null : <BackDrop /> }

            {this.state.openEditor ?
             <ProductForm  goBack={this.openEditor} content={this.state.content} categories={this.state.data.map((elem: any) => {return  {key: elem.category, text: elem.category}})}  /> : <>
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
           <Tables data={this.state.data} editContent={(id: any ) => this.getOneProduct(id)} deleteContents={(ids : any ) => this.deleteProduct(ids)} />
            

            <div className="orders" id="orders">
               <OrderTable data={this.state.data2} />

            </div>
            </>}
        </Fragment>
       )
    }

}