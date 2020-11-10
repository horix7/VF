import React, {Fragment} from 'react';
import { initializeIcons } from '@uifabric/icons';
import './App.css';
import { SignUpForm} from './components/forms/signUpForm' 
import {  loadTheme } from "@fluentui/react"
import StoreCheckout from './components/checkout/Storecheckout'
import LevelUpCheckOut from './components/checkout/premiumCheckout'
import Store from './containers/store'
import HomePage from './containers/homePage'
import AdminDash from './containers/adminPage';
import ProdductPage from './containers/product'
import ArticlePage from './containers/article'
import Video from './containers/videoArea'
import Content from './containers/contentVideoz'
import Footer from './components/navigation/footer'
import {
  Switch,
  Route
} from "react-router-dom";


 loadTheme({
    palette: {
      themePrimary: '#ffd519',
      themeLighterAlt: '#fffdf6',
      themeLighter: '#fff8da',
      themeLight: '#fff2ba',
      themeTertiary: '#ffe675',
      themeSecondary: '#ffda35',
      themeDarkAlt: '#e6c017',
      themeDark: '#c2a213',
      themeDarker: '#8f770e',
      neutralLighterAlt: '#0b0b0b',
      neutralLighter: '#151515',
      neutralLight: '#252525',
      neutralQuaternaryAlt: '#2f2f2f',
      neutralQuaternary: '#373737',
      neutralTertiaryAlt: '#595959',
      neutralTertiary: '#c8c8c8',
      neutralSecondary: '#d0d0d0',
      neutralPrimaryAlt: '#dadada',
      neutralPrimary: '#ffffff',
      neutralDark: '#f4f4f4',
      black: '#f8f8f8',
      white: '#000000',
    }});

   
initializeIcons();

function App() {
  if(!localStorage.cart) {
    localStorage.setItem("cart", "[]")
  }
  return (
    <div className="App">

        <Switch>

        <Route exact path="/admin"> 
              <AdminDash/>
          </Route>

          <Route exact path="/auth"> 
              <SignUpForm/>
          </Route>

          <Route path="/checkout/:id" render={(props: any) => <StoreCheckout {...props}/>}/> 
              
          <Route exact path="/content"> 
              <Content/>
              <Footer />

          </Route>

          <Route path="/content/articles/:id" render={(props: any) => (  <Fragment> <ArticlePage {...props}/>  <Footer /></Fragment>)} /> 
             

          <Route path="/content/video/:id" render={(props: any) => <Fragment> <Video {...props}/>  <Footer /> </Fragment>} /> 

          <Route  path="/levelup/:id" render={(props: any) => <LevelUpCheckOut {...props}/>} /> 
              
          <Route  exact path="/store"> 
              <Store/>
              <Footer />

          </Route>

          <Route path="/store/product/:id" render={(props: any) => (<Fragment>  <ProdductPage {...props}/>  <Footer /></Fragment> )} /> 
             
             
          <Route path="/" exact> 
              <HomePage/>
              <Footer />

          </Route>
         
        </Switch>

    </div>
  );
}
  
export default App;
