import React, {Component, Fragment } from 'react'
import logo from '../../assets/LOGO.png'
import { Icon } from '@fluentui/react/lib/Icon';
import {NavLink } from 'react-router-dom'
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { CartHolder } from '../UI/cart'
import MobileNav from '../UI/homerdrawe'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default class HomeNav extends Component {

    state = {
        mobile_menu: false,
        cart: false,
        currency: localStorage.currency || "USD",
        open: false,

    }
 
    showMobileMenu = () =>  {
        const newState = {...this.state}

        this.setState({
            mobile_menu: !newState.mobile_menu
        })

    }

    openCart = () => {
        const {cart } = this.state
        this.setState({
            cart: !cart
        })
    }

    handleChange  = (event: any) => {
        this.setState({
            currency: event.target.value
        })
        
        if(event.target.value === "USD") {
            localStorage.setItem("currency", "USD")
            localStorage.setItem("rate", "1")
            window.location.reload()
        }else {
            localStorage.setItem("currency", "RWF")
            localStorage.setItem("rate", "990")
            window.location.reload()

        }
        
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    } 

    handleOpen = () => {
        this.setState({
            open: true
        })
    }

 

    render() {

        return (
            <Fragment>
                <CartHolder open={this.state.cart} closeCart={this.openCart}/>
                <nav>
                    <div className="desktopNav">
                       <a href='#'> <div className="naav"> Home </div> </a>

                        <a href="#content" ><div className="naav"> Content/Video </div></a>
                        <a href='#store' ><div className="naav iconaav">
                         <Icon iconName="Shop"  style={{ color: "gold"}}/> Store  </div></a>
                        
                        <a href="#" ><div className="naav1">
                            <img src={logo} width="35%" alt=""/>
                        </div></a>
                        
                       <a href='#contact'> <div className="naav">contact us </div> </a>
                         <div className="naav" onClick={this.openCart}><div className="cartHolder"><Icon className="navIconz" iconName="ShoppingCart" /> <span> {JSON.parse(localStorage.cart).length}</span></div></div>
                        <div className="naav2 searBar">
                                <div className="currencyPicker">
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                    onOpen={this.handleOpen}
                                    value={this.state.currency}
                                    onChange={this.handleChange}
                                    style={{backgroundColor: "transparent", color: "gold"}}
                                    >
                                    <MenuItem value="RWF">RWF</MenuItem>
                                    <MenuItem value="USD">USD</MenuItem>
                                </Select>
                                <SearchBox placeholder="Search" onSearch={newValue => console.log('value is ' + newValue)} />
                                </div>
                               
                        </div>

                        </div>


                        <div className="desktopMobileH2">
                        <div className="menuIcon naav" onClick={this.showMobileMenu}>
                        <MobileNav  handleOpen={this.handleOpen} handleClose={this.handleClose} currency={this.state.currency} handleChange={this.handleChange} open={this.state.open} />
                            {/* {this.state.mobile_menu ? <Icon className="menuIcon"  iconName="ChromeClose"/> : } */}
                        </div>
                       <a href="#">
                       <div className="naav1">
                            <img src={logo} width="45%" alt=""/>
                        </div>
                       </a>

                       <div className="naav2" onClick={this.openCart}>
                        <div className="cartHolder"><Icon className="navIconz" iconName="ShoppingCart" /> <span> {JSON.parse(localStorage.cart).length}</span></div>
                        </div>
                        </div>

                        {/* {this.state.mobile_menu ? 
                         : null} */}

                </nav>
            </Fragment>
        )
    }
}