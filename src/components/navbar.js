import React, { Component } from 'react'
import logo from '../Assets/logo.png';
import logout from '../Assets/logout.svg';
import './css/navbar.css'
import { Link } from 'react-router-dom';
import {Auth} from 'aws-amplify'

class Navbar extends Component{

    handleLogOut = async event =>{
        try{
            Auth.signOut(); 
            // this.props.auth.setAuthStatus(false);
            // this.props.auth.setUser(null);
        }catch(error){
            console.log(error.message);
        }
    }
    render(){
        return(
            <div>
                <nav className="navbar">       
                    <div>
                        <img className="logo" src={logo} alt={'logo'}/>
                    </div>

                    <div className="user">
                        <p>Hello {this.props.username}</p>
                    </div>
                    <div className="logout-button">
                        
                        <img className="logout" src={logout} alt={'logout'}/>
                        <Link to="/login"  onClick={this.handleLogOut} >Log Out</Link>
                    </div>
                </nav>
            </div>
        )
    }
}
export default Navbar;