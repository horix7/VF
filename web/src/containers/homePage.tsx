import React , { Component, Fragment } from "react"
import Homenav from '../components/navigation/home_nav'
import homeImg from '../assets/chineke.jpg'
import appleAppImg from '../assets/apple.png'
import googleAppImg from '../assets/google.png'
import BackendCalls from '../server/backendCalls'
import { ProductDsiplayer, ArticleSlider, VideoPlayer } from '../components/UI/displayProAndContentz'
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { Link } from "react-router-dom"
import { FaStoreAlt, FaStream, FaArrowRight } from "react-icons/fa";
import { DefaultButton } from "@fluentui/react"



const backend = new BackendCalls()
export default class Home extends Component {
    state = {
        products: [],
        articles: [],
        videos: [],
        loading: true
    }


    fetchDataFromNet = async() => {

        const productData = await backend.GetProducts()

        const articleData = await backend.GetArticles(false)
        const videoData = await backend.GetVideos(false)

        this.setState({
            products: productData.data.products ,
            articles: articleData.data.article,
            videos: videoData.data.video,
            loading: false 
        })

    }


    componentDidMount () {
        this.fetchDataFromNet()

    }



    render() {

        return (
            <Fragment>
                <Homenav />

                <div className="home_main">
                    <div className="firstMain">
                        <img src={homeImg} width="90%" alt=""/>
                        <div></div>
                        <div className="first_descr">
                            <p> Lorem ipsum dolor sit amet consec  adi </p>
                            <button className="main_btn"> Level Up </button>
                        </div>
                    </div>

                    <div className="appBanner">
                        <span>Our App available on </span>
                        <div></div>
                       <div className="appLinks">
                       <img src={googleAppImg} width="150px"  alt=""/>
                        <img src={appleAppImg}width="150px"   alt=""/>
                       </div>
                    </div>


                    <div className="smallHeadrInfo">
                            <div className="iconName">
                                <FaStream color="gold" />  &nbsp;
                                <span>Articles / Video</span>
                            </div>

                           <Link to="/content" >
                                <div className="viewMore">
                                <span style={{color: "white"}}>more</span>   &nbsp;
                                <FaArrowRight color="gold" className="moreIcon" />
                                
                            </div>
                           </Link>
                        
                        </div>
        
                    <div>
                      {this.state.articles.length > 1 ? <ArticleSlider articles={this.state.articles} /> :  <ProgressIndicator />} 
                      {this.state.videos.length > 1 ? <VideoPlayer videos={this.state.videos} /> :  <ProgressIndicator />} 
                      
                     
                    </div>

                   
                    <div className="adbbaneer">

                        <div>
                        <p>Upgrade To Our Premium Package </p>
                        <DefaultButton text="level up" />
                        </div>
                    
                    </div>

                    <div className="podcatsContent">

                    </div>

                    <div className="smallHeadrInfo">
                            <div className="iconName">
                                <FaStoreAlt color="gold" />  &nbsp;
                                <span>Our Products</span>
                            </div>

                           <Link to="/store" >
                                <div className="viewMore">
                            <span style={{color: "white"}}>more</span>   &nbsp;
                            <FaArrowRight color="gold" className="moreIcon" />
                                
                            </div>
                           </Link>
                        
                        </div>
                    
                    <div className="recentProducts">
                      {this.state.products.length > 1 ? <ProductDsiplayer products={this.state.products} /> : <ProgressIndicator />} 
                    </div>

                    <div className="level_up">
                        <h3>Level Up </h3>

                        <div className="premiumBox">
                           <div>
                           <p className="pheading">premium fitness content</p>
                            <p className="ppricing"> 20.99$ Monthly </p>
                           </div>
                            <Link to="/levelup/"> <button className="main_btn"> Upgrade </button> </Link>
                        </div>

                       <div className="centerAlg">
                           
                       <div className="premiumBox">
                            <div>
                            <p className="pheading">fitness plans / meal Plans</p>
                            <p className="ppricing"> 20.99$ Monthly </p>
                            </div>
                            <Link to="/levelup/"> <button className="main_btn"> Upgrade </button> </Link>
                        </div>

                       </div>
                    </div>

                    <div className="home_about">


                    </div>

                </div>


            </Fragment>
        )
    }
}