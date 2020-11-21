import React, {Component, Fragment } from 'react'
import logo from '../../assets/LOGO.png'
import { Icon } from '@fluentui/react/lib/Icon';
import {NavLink } from 'react-router-dom'
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { CartHolder } from '../UI/cart'

export default class HomeNav extends Component {

    state = {
        mobile_menu: false,
        cart: false
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

    render() {

        return (
            <Fragment>
                <CartHolder open={this.state.cart} closeCart={this.openCart}/>
                <nav>
                    <div className="desktopNav">
                       <NavLink to={'/'}> <div className="naav"> Home </div> </NavLink>

                        <NavLink to="/content" ><div className="naav"> Content/Video </div></NavLink>
                        <NavLink to='/store' ><div className="naav iconaav">
                         <Icon iconName="Shop"  style={{ color: "gold"}}/> Store  </div></NavLink>
                        
                        <NavLink to="/" ><div className="naav1">
                            <img src={logo} width="35%" alt=""/>
                        </div></NavLink>
                        
                       <NavLink to='/auth'>  <div className="naav2"> <div className="twoIconx"> {localStorage.current_user ?  JSON.parse(localStorage.current_user).upgraded ? <Icon className="navIconz"style={{color: "gold" , fontWeight: "bolder"}} iconName="6PointStar"/> : <Icon className="navIconz" iconName="SignOut"/>  :  <Icon className="navIconz" iconName="Signin"/>}  </div> </div> </NavLink>
                         <div className="naav" onClick={this.openCart}><div className="cartHolder"><Icon className="navIconz" iconName="ShoppingCart" /> <span> {JSON.parse(localStorage.cart).length}</span></div></div>
                        <div className="naav2 searBar">
                               <SearchBox placeholder="Search" onSearch={newValue => console.log('value is ' + newValue)} />
                        </div>

                        </div>


                        <div className="desktopMobileH2">
                        <div className="menuIcon naav" onClick={this.showMobileMenu}>
                            {this.state.mobile_menu ? <Icon className="menuIcon"  iconName="ChromeClose"/> : <Icon iconName="CollapseMenu" className="menuIcon" />}
                        </div>
                       <NavLink to="/">
                       <div className="naav1">
                            <img src={logo} width="35%" alt=""/>
                        </div>
                       </NavLink>

                       <div className="naav2" onClick={this.openCart}>
                        <div className="cartHolder"><Icon className="navIconz" iconName="ShoppingCart" /> <span> {JSON.parse(localStorage.cart).length}</span></div>
                        </div>
                        </div>

                        {this.state.mobile_menu ? 
                        <div className="desktopMobileH">
                        <div className="naav searBar">
                        <SearchBox placeholder="Search" onSearch={newValue => console.log('value is ' + newValue)} />
                        </div>
                       <NavLink to="/"> <div className="naav"> Home </div> </NavLink>
                       <NavLink to="/content" >  <div className="naav"> Content/Video </div> </NavLink>
                        <NavLink to="/store"> <div className="naav">
                        <Icon iconName="Shop"  style={{ color: "gold"}}/>
                            Store 
                             </div></NavLink>
                        
                        <div className="naav"> Upgrade </div>
                       

                    </div>
                : null}

                </nav>
            </Fragment>
        )
    }
}