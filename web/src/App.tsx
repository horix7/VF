import React, {Fragment} from 'react';
import { initializeIcons } from '@uifabric/icons';
import './App.css';
import { SignUpForm} from './components/forms/signUpForm' 
import {  loadTheme } from "@fluentui/react"
import StoreCheckout from './components/checkout/Storecheckout'
import LevelUpCheckOut from './components/checkout/premiumCheckout'
import Store from './containers/store'
import HomePage from './containers/homePage'
import SignedHome from './containers/signedContent'
import MealPlan from './containers/mealPlan'
import AdminDash from './containers/adminPage';
import ProdductPage from './containers/product'
import ArticlePage from './containers/article'
import MealCheckout from './components/checkout/planCheckout'
import Video from './containers/videoArea'
import Content from './containers/contentVideoz'
import Footer from './components/navigation/footer'
import {
  Switch,
  Route
} from "react-router-dom";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#616161',
      main: '#424242',
      dark: '#212121',
      contrastText: '#000',
    },
    secondary: {
      light: '#ffd740',
      main: '#ffd600',
      dark: '#ff6d00',
      contrastText: '#fff',
    },
  },
});

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

  if(!localStorage.currency) {
    localStorage.setItem("currency", "USD")
    localStorage.setItem("rate", "1")
  }
  return (
    <div className="App">
        <ThemeProvider theme={theme}>


        <Switch>

        <Route exact path="/admin"> 
              <AdminDash/>
          </Route>

          <Route exact path="/auth"> 
              <SignUpForm/>
          </Route>

          <Route path="/checkout/order" render={() => <StoreCheckout />}/> 
              
          <Route exact path="/content"> 
              <Content/>
              <Footer />

          </Route>

          <Route path="/content/articles/:id" render={(props: any) => (  <Fragment> <ArticlePage {...props}/>  <Footer /></Fragment>)} /> 
             

          <Route path="/content/video/:id" render={(props: any) => <Fragment> <Video {...props}/>  <Footer /> </Fragment>} /> 

          <Route  path="/levelup" render={() => <LevelUpCheckOut/>} /> 
              
          <Route  exact path="/store"> 
              <Store/>
              <Footer />

          </Route>

          <Route  exact path="/mealplan"> 
              <MealPlan/>

          </Route>

          <Route  exact path="/mealrequest/:price" render={(props: any) => <MealCheckout {...props} />} /> 
             
          
          <Route path="/store/product/:id" render={(props: any) => (<Fragment>  <ProdductPage {...props}/>  <Footer /></Fragment> )} /> 
             
             
          <Route path="/" exact> 
              {localStorage.authToken ? <SignedHome/> : <HomePage />}
              <Footer />

          </Route>
         
        </Switch>
        </ThemeProvider>

    </div>
  );
}
  
export default App;
