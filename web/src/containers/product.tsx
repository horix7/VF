/* eslint-disable react-hooks/rules-of-hooks */
import React , { Component, Fragment } from "react"
import Homenav from '../components/navigation/home_nav'
import Slider from "react-slick";
import '../../node_modules/slick-carousel/slick/slick.css'
import '../../node_modules/slick-carousel/slick/slick-theme.css'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Icon } from '@fluentui/react/lib/Icon';
import {PrimaryButton} from "@fluentui/react"
import {PivotIconCountExample} from '../components/UI/moreProducts'
import BackendCalls from '../server/backendCalls'
import BackDrop from '../components/UI/backDrop'

const backend = new BackendCalls()

export default class ProductPage extends Component<any> {
    state = {
        amount: 1,
        product_info: {
            head: null,
            images: [],
            price: null ,
            description: null,
            review_id: null
        }

    }

    amountCHangeHanlder = (add: boolean) =>  {

        const {amount } = {...this.state}
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


    getProductData = async() => {

        let  product = await backend.GetOneProducts(this.props.match.params.id)
        product = product.data.products.data

        this.setState({
            product_info: product
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
                               <Dropdown
                                placeholder="Select Size "
                                label="Size"
                                options={[
                                    { key: 'A', text: 'small' },
                                    { key: 'B', text: 'large' },
                                        { key: 'D', text: 'large' },
                                    { key: 'E', text: 'x-large' },
                                ]}
                                required
                                // styles={dropdownStyles}
                                />

                               <div>
                                   <p className="label">Amount</p>
                               <div className="adder">
                                    <Icon style={{fontSize: "x-large"}} iconName="SkypeCircleMinus" onClick={() => this.amountCHangeHanlder(false)} />
                                    <p className="currentValue"> {this.state.amount} </p>
                                    <Icon style={{fontSize: "x-large"}} iconName="AddTo" onClick={() => this.amountCHangeHanlder(true)}/>
                                </div>
                               </div>

                               <div className="priceInfo">
                                     $<p>{this.state.product_info.price}</p>
                               </div>

                               <PrimaryButton> 
                                   <Icon iconName="ShoppingCart" />
                                   &nbsp; Buy Now 
                               </PrimaryButton>
                               </div>
                        </div>
                    </div>

                    <div className="more">
                            <PivotIconCountExample info={{
                                description: this.state.product_info.description,
                                review: this.state.product_info.review_id
                            }} />
                    </div>
                </div>
            : <BackDrop />}
            </Fragment>
        )
    }
}