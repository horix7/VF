import React, { Component, Fragment } from "react";
import {Icon } from '@fluentui/react/lib/Icon'


export default class AdminNav extends Component<any> {

    state = {

    }

    componentDidMount () {

    }
    setActive:Function = (elementId : string, state: string) => {
        const elemnt = document.getElementById(elementId)
      if(elemnt !== null ) {
        elemnt.classList.add('active')
        
    }

    this.props.onUpdate(state)
      
    }

    render() {
       

        return (


<nav className="navbar">
<ul className="navbar-nav">
  
  <li className="logo">
   
   
    <a onClick={() => this.setActive("dash" , "dash")} id="dash" className="nav-link">
      <Icon iconName="ViewDashboard" className="homeIcon" />

      <span className="link-text logo-text">sawafit </span>
    </a>
   
  </li>
  

  <li className="nav-item">
   
   
    <a onClick={() => this.setActive("create", "dash")} id="create" className="nav-link">

    <Icon iconName="GoToDashboard" className="homeIcon" />
      
      <span className="link-text">Dashboard </span>

    </a>
   
  </li>
  

  <li className="nav-item">
   
   
    <a onClick={() => this.setActive("content", "createArt")} id="content"  className="nav-link">
    <Icon iconName="ExploreData" className="homeIcon" />
     
      <span className="link-text"> Content </span>
    </a>
   
  </li>
  

  <li className="nav-item">
   
   
    <a onClick={() => this.setActive("store", "createPro")} id="store"  className="nav-link">
    <Icon iconName="VisualsStore" color="gold" className="homeIcon" />
      
        <span className="link-text">Store</span>
    </a>
   
  </li>
  

  <li className="nav-item">
   
   
    <a onClick={() => this.setActive("users", "client")} id="users" className="nav-link">
    <Icon iconName="AccountManagement" className="homeIcon" />
    
      <span className="link-text">Clients</span>
    </a>
   
  </li>
  

  <li className="nav-item" id="themeButton">
    <a className="nav-link"  onClick={() => this.setActive("logout", "logout")}>
    <Icon iconName="SignOut" className="homeIcon" />

      <span className="link-text">Logout</span>
    </a>
   
  </li>
  
</ul>
</nav>

        )
    }
}

