import React, { Component, Fragment } from "react";
import { IconContext } from "react-icons";
import { FiShoppingCart } from "react-icons/fi";
import { MdAddShoppingCart } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import {trimWorlds} from "../../server/conast&func"
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

export default class Video extends Component<any> {
  state = {
    loadingBtn : false,
    clicked: false,
    secondLoading: false
  };


  addToCart = () => {
   
    this.setState({
      clicked: true,
    })

    const newCart = JSON.parse(localStorage.cart)
    newCart.push(this.props.data)
    localStorage.setItem("cart", JSON.stringify(newCart))
    
    setTimeout(() => {
      this.setState({
        loadingBtn: true
      })
    }, 2000);

     
  }

  addToCart2 = () => {
   
    this.setState({
      secondLoading: true,
    })

    const newCart = JSON.parse(localStorage.cart)
    newCart.push(this.props.data)
    localStorage.setItem("cart", JSON.stringify(newCart))
    
    setTimeout(() => {
      this.setState({
        secondLoading: false
      })
    }, 2000);

     
  }
  

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
          <a  href={ window.location.protocol + "//" + window.location.host + "/store/product/" + this.props.data.id}>
          <div className="productInfo">
            <p> {trimWorlds(this.props.data.head)}</p>
          </div>

          </a>
          <div className="productAction">
            <div className="add_cart">
              <IconContext.Provider
                value={{ color: "gold", className: "card_cart" }}
              >
                { !this.state.loadingBtn ? this.state.clicked ? <Spinner style={{marginTop: "10px" , textAlign: "start"}} size={SpinnerSize.small} />  : <FiShoppingCart onClick={this.addToCart} /> : this.state.secondLoading ?  <Spinner style={{marginTop: "10px" , textAlign: "start"}} size={SpinnerSize.small} /> : <MdAddShoppingCart onClick={this.addToCart2} />}
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
