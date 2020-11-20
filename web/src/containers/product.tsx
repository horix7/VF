/* eslint-disable react-hooks/rules-of-hooks */
import React , { Component, Fragment, Key } from "react"
import Homenav from '../components/navigation/home_nav'
import Slider from "react-slick";
import '../../node_modules/slick-carousel/slick/slick.css'
import '../../node_modules/slick-carousel/slick/slick-theme.css'
import { Icon } from '@fluentui/react/lib/Icon';
import {  
    ComboBox,
    IComboBox,
    PrimaryButton} from "@fluentui/react"
import {PivotIconCountExample} from '../components/UI/moreProducts'
import BackendCalls from '../server/backendCalls'
import BackDrop from '../components/UI/backDrop'
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

const backend = new BackendCalls()

export default class ProductPage extends Component<any> {
    state: {[key: string] : any }= {
        amount: 1,
        options: {},
        product_info: {
            head: null,
            id: null,
            images: [],
            price: null ,
            description: null,
            review_id: null,
            specs: []
        },

        loadingBtn: false,
        added: false 

    }

    comboBoxRef = React.createRef<IComboBox>();

    amountCHangeHanlder = (add: boolean) =>  {

        const amount = this.state.amount 
        if(add) {
            this.setState({
                amount: amount + 1
            })
        }else {
           if(this.state.amount === 1) {
               return;
           }else {
            this.setState({
                amount: amount - 1
            })
        }  
           }
    }

    addToCart = () => {

        this.setState({
            loadingBtn: true
        })  
        
        interface MainArr {
            [key: string]: any
          }
          
    

        let { product_info } = this.state
        
        let newProduct: MainArr ={...product_info}

        newProduct["amount"] = this.state.amount
        newProduct["options"] = this.state.options
        const newCart = JSON.parse(localStorage.cart)
        newCart.push(newProduct)
        localStorage.setItem("cart", JSON.stringify(newCart))

        
        setTimeout(() => {
            this.setState({
                loadingBtn: false,
                added: true
            })  

        }, 2000);


    }

    getProductData = async() => {

        let  newproduct = await backend.GetOneProducts(this.props.match.params.id)
        const product = newproduct.data.products.data

        this.setState({
            product_info: {...product, id: newproduct.data.products.id }
        })

    }

    componentDidMount () {
        this.getProductData()
    }
    render() {

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            next: false,
          };

          
        return (
            <Fragment>
                <Homenav />

               {Object.values(this.state.product_info).every((elem: any) => elem !== null) ?  <div className="productPage">
                    <div className="prod">
                        <div className="proImg">
                        <Slider {...settings}>
                            {this.state.product_info.images.map((elem: any, key: React.Key) => <img key={key} width="100%" style={{objectFit: "cover", height: "500px"}}  src={elem} alt=""/>)}
                         </Slider>
                        </div>

                        <div className="proSpecs">
                             <h1> {this.state.product_info.head}</h1>
                               <div className="specs">
                               {this.state.product_info.specs.map((elem:any, key: Key ) => (
                                   <ComboBox
                                   key={key}
                                   placeholder={this.state.options[elem.name] || `Select  ${elem.name}`}
                                   label={elem.name}
                                   componentRef={this.comboBoxRef}
                                   defaultValue={this.state.options[elem.name]}
                                   allowFreeform
                                    autoComplete="on"
                                   onChange={(event: any, item: any) => {
                                    let  options  = this.state.options

                                    let options1: {[key: string] : any } = {...options}
                                    options1[elem.name ] = item.text

                                    this.setState({
                                        options: options1
                                    })
                                   }}
                                   options={[...elem.items.map((ele: any ) => {
                                       return {
                                           key: ele.text + Date.now(),
                                           text: ele.text 
                                       }
                                   })]}
                                   required
                                   // styles={dropdownStyles}
                                   />
   
                               ))}
                               <div>
                                   <p className="label">Amount</p>
                               <div className="adder">
                                    <Icon style={{fontSize: "x-large"}} iconName="SkypeCircleMinus" onClick={() => this.amountCHangeHanlder(false)} />
                                    <p className="currentValue"> {this.state.amount} </p>
                                    <Icon style={{fontSize: "x-large"}} iconName="AddTo" onClick={() => this.amountCHangeHanlder(true)}/>
                                </div>
                               </div>

                               <div className="priceInfo">
                                     $<span>{this.state.product_info.price}</span>
                               </div>

                               {this.state.loadingBtn ? <Spinner style={{color: "black"}} color="black" size={SpinnerSize.medium} />  :  <PrimaryButton onClick={this.addToCart}> 
                                    <Icon iconName="ShoppingCart" />
                                   &nbsp; { JSON.parse(localStorage.cart).some((elem: any) => this.state.product_info.id === elem.id) ? " Add More" : " Add To Cart"}
                            </PrimaryButton> }
                               </div>
                        </div>
                    </div>

                    <div className="more">
                            <PivotIconCountExample info={{
                                description: this.state.product_info.description,
                                review_id: this.state.product_info.review_id
                            }} />
                    </div>
                </div>
            : <BackDrop />}
            </Fragment>
        )
    }
}