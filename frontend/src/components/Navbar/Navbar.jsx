import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../assets/logo_website.png'
import cart_icon from '../assets/cart_icon.png'
import nav_dropdown from '../assets/nav_dropdown.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {

    const [menu, setMenu] = useState("home");
    const { getTotalCartItems } = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    const handleNavClick = (menuType) => {
        setMenu(menuType);
        window.scrollTo(0, 0); // Scroll to the top
    }

    return (
        <div className='navbar'>
            <Link to='/' onClick={() => handleNavClick("home")} className="nav-logo">
                <img src={logo} alt="Logo" />
            </Link>
            <img onClick={dropdown_toggle} className='nav-dropdown' src={nav_dropdown} alt="Menu" />
            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => handleNavClick("home")}>
                    <Link to='/'>Home</Link>
                    {menu === "home" ? <hr /> : <></>}
                </li>
                <li onClick={() => handleNavClick("shop")}>
                    <Link to='/shop'>Shop</Link>
                    {menu === "shop" ? <hr /> : <></>}
                </li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')
                    ? <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace("/"); }}>Logout</button>
                    : <Link to='/login' style={{ textDecoration: 'none' }}><button>Login</button></Link>}
                <Link to="/cart"><img src={cart_icon} alt="Cart" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar
