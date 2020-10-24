import React, { Component, Fragment } from "react";
import HomeNav from '../components/navigation/home_nav'
import {PrimaryButton} from '@fluentui/react'

export default class StorePage extends Component<any> {

    state = {

    }

    render() {

        return (

            <Fragment>
                <div className="mainPage">

                <HomeNav />
                <div className="sliderHolder">
                   <div>
                   <p>Lorem ipsum dolor sit amet consectettionem error quia non deserunt, dolor</p>
                    <PrimaryButton text="Shop Now " className="btnBig" type="large"/>
                   </div>

                </div>
                </div>

            </Fragment >
        )
    }
}