import React, { Component } from 'react'
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
                <p>NextConnect</p>      
                    <div>
                        {/* <img className="logo" src={logo} alt={'logo'}/> */}
                        
                    </div>

                    <div className="user">
                        <p>Hello {this.props.username}</p>
                    </div>
                    <div className="logout-button">
                        
                        {/* <img className="logout" src={logout} alt={'logout'}/> */}
                        <Link to="/"  onClick={this.handleLogOut} >Log Out</Link>
                    </div>
                </nav>
            </div>
        )
    }
}
export default Navbar;