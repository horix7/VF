import React, { Component, Fragment } from "react";
import HomeNav from '../components/navigation/home_nav'
import {PrimaryButton} from '@fluentui/react'
import Chip from '@material-ui/core/Chip';

export default class StorePage extends Component<any> {

    state = {

    }

    render() {
        
      
        const category = [
            {name: "shoes", label: "shoes"},
            {name: "sportSHoes", label: "sportSHoes"},
            {name: "shoes", label: "shoes"},
            {name: "sportSHoes", label: "sportSHoes"},{name: "shoes", label: "shoes"},
            {name: "sportSHoes", label: "sportSHoes"},{name: "shoes", label: "shoes"},
            {name: "sportSHoes", label: "sportSHoes"},{name: "shoes", label: "shoes"},
            {name: "sportSHoes", label: "sportSHoes"},{name: "shoes", label: "shoes"},
            {name: "sportSHoes", label: "sportSHoes"},
        ]
        return (

            <Fragment>
                <div className="mainPage">

               <div className="homeNavHolder">
               <HomeNav />

             
               </div>
                <div className="sliderHolder">
                   <div>
                   <p>Lorem ipsum dolor sit amet consectettionem error quia non deserunt, dolor</p>
                    <PrimaryButton text="Shop Now " className="btnBig" type="large"/>
                   </div>

                </div>

               <div className="categoryHolder">
              
              { category.map((data, key) => (
                   <Chip
                       
                       label={data.label}
                       className="chipElement"
                       // icon={ArrowForwardIosIcon}

                   />
                   ))}
          </div>
          <div className="catt">
                <div className="caat">

                </div>
               </div>
                </div>

            </Fragment >
        )
    }
}