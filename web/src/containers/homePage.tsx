import React , { Component, Fragment, Key } from "react"
import Homenav from '../components/navigation/homepagenav'
import appleAppImg from '../assets/apple.png'
import googleAppImg from '../assets/google.png'
import BackendCalls from '../server/backendCalls'
import { ProductDsiplayer, ArticleSlider, VideoPlayer } from '../components/UI/displayProAndContentz'
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { Link } from "react-router-dom"
import { FaStoreAlt, FaStream, FaArrowRight } from "react-icons/fa";
import { FcCloseUpMode } from "react-icons/fc";
import { DefaultButton, Icon } from "@fluentui/react"
import MealBox from '../components/UI/mealPlanBox'
import { Typography } from "@material-ui/core"
import PlanSurvey from '../components/models/fitPlan'
import ContactUs from '../components/forms/contact-us'

const backend = new BackendCalls()
export default class Home extends Component {
    state: { [key: string] : any } = {
        products: [],
        articles: [],
        homeContent: {},
        plans: [],
        videos: [],
        loading: true
    }


    fetchDataFromNet = async() => {

        const productData = await backend.GetProducts()
        const GetHomeContent = await backend.GetHomeContent()
        const mealPlans = await backend.getMealPlans()
        const articleData = await backend.GetArticles(false)
        const videoData = await backend.GetVideos(false)

        this.setState({
            products: productData.data.products ,
            plans: mealPlans.data.products,
            articles: articleData.data.article,
            videos: videoData.data.video,
            homeContent: GetHomeContent.data.article.data,
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
                <div className="firstBackground">

                    {Object.keys(this.state.homeContent).length > 1 ? <div className="firstMain">
                      {/* <img src={this.state.homeContent.home.pic} width="90%" alt=""/> */}
                        <div className="makeFronImg"></div>
                        <div></div>
                        <div className="first_descr">
                           
                            <p> {this.state.homeContent.home.content}</p>
                            <button onClick={() => window.location.href = "#level_up"} className="main_btn"> Level Up </button>
                        </div>
                    </div>  :  <ProgressIndicator /> }
                    <div className="blackBackground">

                    <div className="appBanner">
                        <Typography >Download Our App on </Typography >
                        <div></div>
                       <div className="appLinks">
                       <img src={googleAppImg} width="150px"  alt=""/>
                        <img src={appleAppImg}width="150px"   alt=""/>
                       </div>
                    </div>


                    <div className="smallHeadrInfo" id="content">
                            <div className="iconName">
                                <FcCloseUpMode color="gold" />  &nbsp;
                                <span>Articles / Video</span>
                            </div>

                           <Link to="/content" >
                                <div className="viewMore">
                                <span style={{color: "white"}}>more</span>   &nbsp;
                                <FaArrowRight color="gold" className="moreIcon" />
                                
                            </div>
                           </Link>
                        
                        </div>
                        </div>
                        </div>
        
                    <div>
                      {this.state.articles.length > 1 ? <ArticleSlider articles={this.state.articles} /> :  <ProgressIndicator />} 
                      {this.state.videos.length > 1 ? <VideoPlayer videos={this.state.videos} /> :  <ProgressIndicator />} 
                      
                     
                    </div>

                  

<div className="backgroundsecond">
<div className="blackBackgroundtrans">
                   <div className="smallHeadrInfo">
                            <div className="iconName">
                                <FaStream color="gold" />  &nbsp;
                                <span>Meal Plans </span>
                            </div>

                           <div>
                            
                           </div>
                        
                        </div>
                        <div className="upgradeIndicator">
                         <p className="upgradeMessage"> Get A Personalized Meal Plan <br /> For Your Body Type  </p>
                          

                        <PlanSurvey />
                     </div>

                   <div className="mealPlansDisplayer">
                      {this.state.plans.length > 1 ? this.state.plans.map((elem: any, key: Key) => <div key={key}><MealBox data={elem} /> </div> ) : <ProgressIndicator /> } 
                        
                    </div>
                   </div>
                    <div className="adbbaneer">

                        <div>
                        <p>Upgrade To Our Premium Package </p>
                        <DefaultButton onClick={() => window.location.href = "#level_up"} text="level up" />
                        </div>
                    
                    </div>

                    <div className="podcatsContent">

                    </div>

                    <div className="smallHeadrInfo"  id="store">
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

                    <div className="level_up blackBackgroundtrans" id="level_up">
                        <h3>Level Up </h3>

                        <div className="premiumBox">
                           <div>
                           <p className="pheading">premium fitness content</p>
                            <p className="ppricing"> 20.99$ Monthly </p>
                           </div>
                            <Link to="/levelup/"> <button className="main_btn"> Upgrade </button> </Link>
                        </div>

                        </div>

                       <div className="centerAlg">
                           
                       {/* <div className="premiumBox">
                            <div>
                            <p className="pheading">fitness plans / meal Plans</p>
                            <p className="ppricing"> 20.99$ Monthly </p>
                            </div>
                            <Link to="/levelup/"> <button className="main_btn"> Upgrade </button> </Link>
                        </div> */}

                       </div>
                    </div>

                    <div id="contact">
                        <div className="aboutaddress">
                            <div className="one_info_holder">
                                <Icon iconName="MapDirections" className="contact_icons" />
                                <p>  {Object.keys(this.state.homeContent).length > 1 ? this.state.homeContent.address.content : null }  </p>
                            </div>

                            <div className="one_info_holder">
                                <Icon iconName="CellPhone" className="contact_icons" />
                                <p>  {Object.keys(this.state.homeContent).length > 1 ? this.state.homeContent.number.content : null }  </p>
                            </div>

                            <div className="one_info_holder">
                                <Icon iconName="Mail" className="contact_icons" />
                                <p>  {Object.keys(this.state.homeContent).length > 1 ? this.state.homeContent.email.content : null }  </p>
                            </div>
                        </div>
                    <ContactUs />

                    </div>

                   


                </div>


            </Fragment>
        )
    }
}