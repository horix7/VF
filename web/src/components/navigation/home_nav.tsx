import React, {Component, Fragment } from 'react'
import logo from '../../assets/LOGO.png'
import { Icon } from '@fluentui/react/lib/Icon';
import {NavLink } from 'react-router-dom'

export default class HomeNav extends Component {

    state = {
        mobile_menu: false,
    }
 
    showMobileMenu = () =>  {
        const newState = {...this.state}

        this.setState({
            mobile_menu: !newState.mobile_menu
        })

    }

    render() {

        return (
            <Fragment>
                <nav>
                    <div className="desktopNav">
                       <NavLink to={'/'}> <div className="naav"> Home </div> </NavLink>

                        <NavLink to="/content" ><div className="naav"> Content/Video </div></NavLink>
                        <NavLink to='/store' ><div className="naav iconaav">
                         <Icon iconName="Shop"  style={{ color: "gold"}}/> Store  </div></NavLink>
                        
                        <NavLink to="/" ><div className="naav1">
                            <img src={logo} width="35%" alt=""/>
                        </div></NavLink>
                        
                        <div className="naav2"> updagrade </div>
                        <div className="naav2">
                               <div className="search">
                                    <div>
                                        <input type="text" className="searchBar"/>
                                    <Icon iconName="Search" style={{fontSize: "small", marginTop:"3px" , cursor:"pointer"}} /> 
                                    </div>
                               </div>
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

                       <NavLink to="/checkout">
                       <div className="cartBox naav2">
                            <div className="cartIcon">
                                <Icon iconName="ShoppingCart" className="cartIIcon"/>
                            </div>
                        </div>
                       </NavLink>
                        </div>

                        {this.state.mobile_menu ? 
                        <div className="desktopMobileH">
                        <div className="naav">
                               <div className="search">
                                    <div>
                                        <input type="text" className="searchBar1"/>
                                    <Icon iconName="Search" style={{fontSize: "small", marginTop:"3px" , cursor:"pointer" , textAlign: "center", color: "gold"}} /> 
                                    </div>
                               </div>
                             </div>
                       <NavLink to="/"> <div className="naav2"> Home </div> </NavLink>
                       <NavLink to="/content" >  <div className="naav2"> Content/Video </div> </NavLink>
                        <NavLink to="/store"> <div className="naav2">
                        <Icon iconName="Shop"  style={{ color: "gold"}}/>
                            Store 
                             </div></NavLink>
                        
                        <div className="naav2"> Upgrade </div>
                       

                    </div>
                : null}

                </nav>
            </Fragment>
        )
    }
}