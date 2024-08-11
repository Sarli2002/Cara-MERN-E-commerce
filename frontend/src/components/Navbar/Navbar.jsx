import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../assets/logo_website.png'
import cart_icon from '../assets/cart_icon.png'
import nav_dropdown from '../assets/nav_dropdown.png'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {

    const [menu,setMenu] = useState("home");
    const {getTotalCartItems}= useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
      menuRef.current.classList.toggle('nav-menu-visible');
      e.target.classList.toggle('open');
    }

  return (
    <div className='navbar'>
      <Link to='/' onClick={()=>{setMenu("home")}} className="nav-logo">
        <img src={logo} alt="" />
        
      </Link>
      <img onClick={dropdown_toggle} className='nav-dropdown' src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={()=>{setMenu("home")}}><Link to='/'>Home</Link>{menu==="home"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("shop")}}><Link to='/shop'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li> 
        <li onClick={()=>{setMenu("about-us")}}><Link to='/'>About Us</Link>{menu==="about-us"?<hr/>:<></>}</li> 
        
        
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace("/");}}>Logout</button>
        :<Link to='/login' style={{ textDecoration: 'none' }}><button>Login</button></Link>}
        <Link to="/cart"><img src={cart_icon} alt="cart"/></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
     
    </div>
  )
}

export default Navbar