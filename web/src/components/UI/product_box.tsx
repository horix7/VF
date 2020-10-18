import React, {Component, Fragment } from 'react'
import capture from '../../assets/shoes.jpg'

// import {  } from '@fluentui/react'

import { IconContext} from 'react-icons'
import { FiShoppingCart } from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";

export default class Video extends Component {

    state = {

    }


    render() {

        return (
            <Fragment>

            <div className="product_box">
                <div className="productImg">
                    <img src={capture} alt="" width="300px" height="300px" />
                </div>

                <div className="productInfo">
                    <p>xfirest product to be made </p>
                </div>

                <div className="productAction">
                  <div className="add_cart">
                  <IconContext.Provider value={{color: "gold", className:"card_cart"}}>
                    <FiShoppingCart />
                    </IconContext.Provider>
                  </div>
                    <div className="price">
                        <p>32.44$</p>
                    <IconContext.Provider value={{color: "gold", className:"card_view"}}>
                        <MdKeyboardArrowRight />
                    </IconContext.Provider>
                    </div>
                </div>
            </div>
               
            </Fragment>
        )
    }
}