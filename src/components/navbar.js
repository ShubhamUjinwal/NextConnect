import React, { Component } from 'react'
import logo from '../Assets/logo.png';
import logout from '../Assets/logout.svg';
import './css/navbar.css'

class Navbar extends Component{
    render(){
        return(
            <div>
                <nav className="navbar">       
                    <div>
                        <img className="logo" src={logo} alt={'logo'}/>
                    </div>

                    <div className="user">
                        <p>Hello </p>
                    </div>
                    <div className="logout-button">
                        
                        <img className="logout" src={logout} alt={'logout'}/>
                        <a href="/">Log Out</a>
                    </div>
                </nav>
            </div>
        )
    }
}
export default Navbar;