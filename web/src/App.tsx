import React from 'react';
import { initializeIcons } from '@uifabric/icons';
import './App.css';
import Admin from './containers/adminPage'
import { SignUpForm} from './components/forms/signUpForm' 
import {  loadTheme } from "@fluentui/react"
import StoreCheckout from './components/checkout/Storecheckout'
import LevelUpCheckOut from './components/checkout/premiumCheckout'
import Store from './containers/store'

localStorage.setItem("backendUrl" , "http://vfitness-8a2c3.firebaseio.com")
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
  return (
    <div className="App">
        <Admin/>
    </div>
  );
}
  
export default App;
