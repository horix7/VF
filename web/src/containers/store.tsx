import React, { Component, Fragment } from "react";
import HomeNav from '../components/navigation/home_nav'
import {PrimaryButton , DefaultButton } from '@fluentui/react'
import {ProductDsiplayer } from '../components/UI/displayProAndContentz'
import BackendCalls  from '../server/backendCalls'
import Probox from '../components/UI/product_box'
import BackDrop from '../components/UI/backDrop'
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { FaArrowRight, FaRegClock , FaHotjar , FaGripHorizontal } from "react-icons/fa";
import { Link } from "react-router-dom";
import Slider from 'react-slick'


const backend = new BackendCalls()
export default class StorePage extends Component<any> {

    state: { [key: string] : any} = {
        hot: [],
        recent: [],
        allProducts: [],
        home: {},
        categories: [],
        loading: false,
        backDrop: true,
        displayProducts: {
            current: 3, 
            data: []
        }
    }

    
    getMoreData = (data: string) => {    

        if(data === "article") {
         this.setState({
             loading: true
         })
         let newArticleData = [...this.state.allProducts]
         setTimeout(() => {
             if(newArticleData.length > this.state.displayProducts.current) {
             newArticleData.length = this.state.displayProducts.current + 4
 
             const changedArray = {
                 current: this.state.displayProducts.current + 4,
                 data: newArticleData
             }
             this.setState({
                 displayProducts: {...changedArray}
             })
 
            
         } else {
             newArticleData.length = this.state.allProducts.length
 
             const changedArray = {
                 current: this.state.allProducts.length,
                 data: newArticleData
             }
             this.setState({
                 displayProducts: {...changedArray}
             })
 
            
         }
         this.setState({
             loading: false
         })
         
         }, 2000);
        } 
     }

    getProductData = async () => {
        const newProductData = await backend.GetProducts()
        const homeData = await backend.GetHomeContent()
        const recent = [...newProductData.data.products].reverse()

        const categories = [...new Set(newProductData.data.products.map((elem: any) => elem.category))].map((elem: any ) => {
            return {
                name: elem,
                label: elem
            }
        })

        if(categories.length < 8) {
            for (let index = 0; index < 11 - categories.length ; index++) {
               categories.push({
                   name: " ",
                   label: " "
               })
                
            }
        }

        this.setState({
            hot: newProductData.data.products,
            recent: recent ,
            allProducts: newProductData.data.products,
            home: homeData.data.article.data,
            categories: categories,
            backDrop: false

        })

        this.getMoreData("article")

    }

    componentDidMount() {
        this.getProductData()
    }

    render() {
        
      
        const category = [
           ...this.state.categories
        ]

        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 8,
            slidesToScroll: 2,
            initialSlide: 0,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 6,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 2,
                  initialSlide: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1
                }
              }
            ]
          };

        return (

            <Fragment>
               <HomeNav />

                {this.state.backDrop ? <BackDrop /> :
 <div className="mainPage">
    <div className="sliderHolder">
   <div>
   <p>{this.state.home.store.content}</p>
    <PrimaryButton text="Shop Now " className="btnBig" type="large"/>
   </div>

</div>

{/* <div className="sliderMnger" style={{paddingTop: "40px"}}>
<Slider {...settings}>
{ category.map((data, key) => (
   <Link  key={key} to={"/product/category/" + data.label} >
       <DefaultButton text={data.label || "products"} />
   </Link>
   ))}

</Slider>
  

</div> */}
<div className="productSlider">
    <div className="smallHeadrInfo">
        <div className="iconName">
            <FaHotjar color="gold" />  &nbsp;
            <span>Hot Products</span>
        </div>

        <div className="viewMore">
        
        </div>
       
    </div>
   
    <ProductDsiplayer products={this.state.hot}/>
</div>

<div className="productSlider">
<div className="smallHeadrInfo">
        <div className="iconName">
            <FaRegClock color="gold" />  &nbsp;
            <span>Recent Products</span>
        </div>

        <div className="viewMore">
        
        </div>
       
    </div>
   
    <ProductDsiplayer products={this.state.recent}/>
</div>

<div className="morePros">
    
<div className="smallHeadrInfo">
        <div className="iconName">
            <FaGripHorizontal color="gold" />  &nbsp;
            <span>More Products</span>
        </div>

        <div className="viewMore">
        <span>more</span>   &nbsp;
        <FaArrowRight color="gold" className="moreIcon" />
            
        </div>
       
    </div>
   
    <div className="gridz">
        {this.state.displayProducts.data.length > 0 ? 
        this.state.displayProducts.data.map((elem: any, key: React.Key) => ( <div className="gridHolder" key={key}> <Probox data={elem}/> </div>)) : <ProgressIndicator /> }
    </div>
   {this.state.loading ? <ProgressIndicator /> :  <DefaultButton style={{marginLeft: "20px"}} onClick={() => this.getMoreData("article")} text="Load More" />}
    

</div>
</div>
}
            </Fragment >
        )
    }
}