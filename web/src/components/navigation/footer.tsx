import React from "react";
import logo from '../../assets/LOGO.png'
import { FaYoutube, FaFacebookF ,FaInstagram, FaWhatsapp , FaRegEnvelopeOpen } from "react-icons/fa";

const FooterPage = () => {
  return (
        <div>
        <footer className="footer">
  <div className="footer-left col-md-4 col-sm-6">
    <p className="about">
      <span> About sawafit</span> Ut congue augue non tellus bibendum, in varius tellus condimentum. In scelerisque nibh tortor, sed rhoncus odio condimentum in. Sed sed est ut sapien ultrices eleifend. Integer tellus est, vehicula eu lectus tincidunt,
      ultricies feugiat leo. Suspendisse tellus elit, pharetra in hendrerit ut, aliquam quis augue. Nam ut nibh mollis, tristique ante sed, viverra massa.
    </p>
    <div className="icons">
      <a href="#">  <FaYoutube/></a>
      <a href="#">  <FaInstagram/></a>
      <a href="#">  <FaWhatsapp/></a>
      <a href="#">  <FaFacebookF/></a>
    </div>
  </div>
  <div className="footer-center col-md-4 col-sm-6">
    <div>
      <i className="fa fa-map-marker"></i>
      <p><span> Address </span> Kigali, Rwanda </p>
    </div>
    <div>
      <i className="fa fa-phone"></i>
      <p> (+00) 0000 000 000</p>
    </div>
    <div>
    
      <p> <a href="#">   &nbsp;  &nbsp; contact@sawafit.com</a></p>
    </div>
  </div>
  <div className="footer-right col-md-4 col-sm-6">
    <h2>  <img src={logo} width="200px" alt=""/></h2>
    <p className="menu">
      <a href="#"> Home</a> &nbsp;  |  &nbsp; 
      <a href="#"> About</a>  &nbsp; |  &nbsp; 
      <a href="#"> Upgrade</a>  &nbsp;  
    </p>
    <p className="name">  &copy; {new Date().getFullYear()} Copyright: <a href="https://www.sawafit.com" style={{textDecoration: "none" , textTransform: "uppercase" , color: "gold"}}> sawafit.com </a>
    </p>
  </div>
</footer>
     </div>
  )  
     
}

export default FooterPage;