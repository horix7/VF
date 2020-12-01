import React, { Component, Fragment } from "react";
import logo from '../../assets/LOGO.png'
import { FaYoutube, FaFacebookF ,FaInstagram, FaWhatsapp , FaRegEnvelopeOpen } from "react-icons/fa";
import BackendCalls from "../../server/backendCalls"

const backend = new BackendCalls()

class FooterPage extends Component<any> {

  state : { [key: string ] : any } = {
    home: { }
  }
 
  getFooterData = async () => {
   const home = await  backend.GetHomeContent()

   this.setState({
     home: home.data.article.data
   })
  }

  componentDidMount() {
    this.getFooterData()
  }
  

  render() {
    return (
   <Fragment>
     {Object.keys(this.state.home).length > 1 ? 
        <div>
        <footer className="footer">
  <div className="footer-left col-md-4 col-sm-6">
    <p className="about">
      <span> About sawafit</span>{this.state.home.about.content} </p>
    <div className="icons">
      <a href={this.state.home.youtube.content}>  <FaYoutube/></a>
      <a href={this.state.home.instagram.content}>  <FaInstagram/></a>
      <a href={this.state.home.whatsapp.content}>  <FaWhatsapp/></a>
      <a href={this.state.home.facebook.content}>  <FaFacebookF/></a>
    </div>
  </div>
  <div className="footer-center col-md-4 col-sm-6">
    <div>
      <i className="fa fa-map-marker"></i>
      <p><span> Address </span> {this.state.home.address.content} </p>
    </div>
    <div>
      <i className="fa fa-phone"></i>
      <p>  {this.state.home.number.content}</p>
    </div>
    <div>
    
      <p> <a href={this.state.home.email.content}>   &nbsp;  &nbsp;  {this.state.home.email.content}</a></p>
    </div>
  </div>
  <div className="footer-right col-md-4 col-sm-6">
    <h2>  <img src={logo} width="200px" alt=""/></h2>
    <p className="menu">
      <a href="/"> Home</a> &nbsp;  |  &nbsp; 
      <a href="#levelup"> Upgrade</a>  &nbsp;  
    </p>
    <p className="name">  &copy; {new Date().getFullYear()} Copyright: <a href="https://www.sawafit.com" style={{textDecoration: "none" , textTransform: "uppercase" , color: "gold"}}> sawafit.com </a>
    </p>
  </div>
  </footer>
     </div> :  null}
   </Fragment>
)  
  }
     
}

export default FooterPage;