import React from 'react'
import "./Footer.css"
export default function Footer() {
  return (
    <div className='footer section-p1'>
  <div className="col">
  <a href="#"><img class="logo" src="https://i.postimg.cc/x8ncvFjr/logo.png" alt='logo'/></a>
      <h4>Contact</h4>
       <p><strong>Address:</strong>349, Olorilogbon street, Onigbogbo Lagos</p>
      <p><strong>Phone:</strong>+23456876199, +23458903120</p>
      <p><strong>Hours:</strong>10.00 - 18.00, Mon - Sat</p>
         <div className="follow">
           <h4>Follow Us</h4>
           <div className="icon">
             <i className="fab fa-facebook-f"></i>
             <i className="fab fa-instagram"></i>
             <i className="fab fa-twitter"></i>
             <i className="fab fa-youtube"></i>
             <i className="fab fa-pinterest-p"></i>
              </div>
         </div>
         </div>
        
      <div className="sec">   
      <div className="col">
        <h4>About</h4>
        <a href="#">About Us</a>
        <a href="#">Delivery Information</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms and Condition</a>
        <a href="#">Contact Us</a>
     </div>
      
      <div className="col">
        <h4>My Account</h4>
        <a href="#">Sign In</a>
        <a href="#">View Cart</a>
        <a href="#">My Account</a>
        <a href="#">My Wishlist</a>
        <a href="#">Track my Order</a>
        <a href="#">Help</a>
          
      </div>
      
      <div className="col install">
        <h4>Install App</h4>
        <p>From App Store or Google Play</p>
   
        <div class="row">
        <img src="https://i.postimg.cc/Y2s5mLdR/app.jpg" alt=""/>
        <img src="https://i.postimg.cc/7YvyWTS6/play.jpg" alt=""/>
      </div>
      <p>Secured Payment Gateways</p>
      <img src="https://i.postimg.cc/kgfzqVRW/pay.png" alt=""/>
         </div>
    </div>
    
    <div class="coypright">
        <p> © 2023 All rights reserved!</p>
      </div>
    
   
    </div>
  )
}
