import React, { Component, Fragment } from "react";
// import { HiOutlineShare } from "react-icons/hi";
import { IconContext } from "react-icons";
import { IoMdImages } from "react-icons/io";
import {trimWorlds , trimWorlds2} from '../../server/conast&func'
import { PrimaryButton } from '@fluentui/react'
import { Link } from "react-router-dom";


export default class MealBox extends Component<any> {
  state = {};

  render() {
    return (
      <Fragment>
           
     <div className="MealBox">
          <div className="imgBox" >
            <div>
              <img
                src={this.props.data.images}
                width="100%"
                alt=""
                style={{objectFit: "cover", height: "100%"}}
              />
            </div>
           
          </div>

          <div className="mealInfo">
            <p className="mealPrice">{localStorage.currency}{Number(this.props.data.price) * Number(localStorage.rate)}</p>
            <p className="headfis"> {trimWorlds(this.props.data.head)}</p>
            <p className="headsec"> {trimWorlds2(this.props.data.body)}</p>

            <Link to={"/mealrequest/" + this.props.data.head } onClick={() => {
                localStorage.setItem("mealPlan", JSON.stringify({...this.props.data}))
            }} >
            <PrimaryButton text={"ReQuest Now"} />
            </Link>
          </div>
        </div>
    
      </Fragment>
    );
  }
}
