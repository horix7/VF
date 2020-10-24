import React, {Component, Fragment } from 'react'
import logo from '../../assets/logo.jpeg'
import { Icon } from '@fluentui/react/lib/Icon';


export default class HomeNav extends Component {

    state = {
        mobile_menu: false
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
                        <div className="naav"> Home </div>
                        <div className="naav"> Content/Video </div>
                        <div className="naav iconaav">
                        
                         <Icon iconName="Shop"  style={{ color: "gold"}}/>
                            
                             Store 
                             </div>
                        
                        <div className="naav1">
                            <img src={logo} width="30px" height="40px" alt=""/>
                        </div>
                        
                        <div className="naav2"> About Us </div>
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
                        <div className="naav1">
                            <img src={logo} width="30px" height="40px" alt=""/>
                        </div>

                        <div className="cartBox naav2">
                            <div className="cartIcon">
                                <Icon iconName="ShoppingCart" className="cartIIcon"/>
                            </div>
                        </div>
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
                        <div className="naav2"> Home </div>
                        <div className="naav2"> Content/Video </div>
                        <div className="naav2">
                        <Icon iconName="Shop"  style={{ color: "gold"}}/>
                            
                            Store 
                             </div>
                        
                        <div className="naav2"> About Us </div>
                       

                    </div>
                : null}

                </nav>
            </Fragment>
        )
    }
}