import React , { Component, Fragment } from "react"
import Homenav from '../components/navigation/home_nav'
import homeImg from '../assets/chineke.jpg'
import appleAppImg from '../assets/apple.png'
import googleAppImg from '../assets/google.png'

export default class Home extends Component {
    state = {

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
                        <p>Our App available on </p>
                        <div></div>
                       <div className="appLinks">
                       <img src={googleAppImg} width="150px"  alt=""/>
                        <img src={appleAppImg}width="150px"   alt=""/>
                       </div>
                    </div>


                    <div className="recentContent">

                    </div>

                    <div className="podcatsContent">

                    </div>

                    <div className="recentProducts">

                    </div>

                    <div className="level_up">
                        <h3>Level Up </h3>

                        <div className="premiumBox">
                           <div>
                           <p className="pheading">premium fitness content</p>
                            <p className="ppricing"> 20.99$ Monthly </p>
                           </div>
                            <button className="main_btn"> Upgrade </button>
                        </div>

                       <div className="centerAlg">
                           
                       <div className="premiumBox">
                            <div>
                            <p className="pheading">fitness plans / meal Plans</p>
                            <p className="ppricing"> 20.99$ Monthly </p>
                            </div>
                            <button className="main_btn"> Upgrade </button>
                        </div>

                       </div>
                    </div>

                    <div className="home_about">


                    </div>

                    {/* <footer></footer> */}
                </div>

            </Fragment>
        )
    }
}