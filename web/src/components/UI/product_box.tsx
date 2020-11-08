import React, { Component, Fragment } from "react";
import { IconContext } from "react-icons";
import { FiShoppingCart } from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";
import {trimWorlds} from "../../server/conast&func"

import {
    BrowserRouter as Router,
    Link,
} from 'react-router-dom'


export default class Video extends Component<any> {
  state = {};

  render() {
    return (
      <Fragment>
              
              <div className="product_box">
          <div className="productImg">
            <img
              src={this.props.data.images[0]}
              alt=""
              width="100%"
              style={{objectFit: "cover"}}
            />
          </div>
          <Link to={"store/product/" + this.props.data.id}>
          <div className="productInfo">
            <p> {trimWorlds(this.props.data.head)}</p>
          </div>

          </Link>
          <div className="productAction">
            <div className="add_cart">
              <IconContext.Provider
                value={{ color: "gold", className: "card_cart" }}
              >
                <FiShoppingCart />
              </IconContext.Provider>
            </div>
            <div className="price">
              <p>${this.props.data.price}</p>
              <IconContext.Provider
                value={{ color: "gold", className: "card_view" }}
              >
                <MdKeyboardArrowRight />
              </IconContext.Provider>
            </div>
          </div>
        </div>
      
              
      </Fragment>
    );
  }
}
