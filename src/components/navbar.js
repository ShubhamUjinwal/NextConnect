import React, { Component } from 'react'
import './css/navbar.css'
import { Link } from 'react-router-dom';
import {Auth} from 'aws-amplify'
import { FaPowerOff } from 'react-icons/fa'
import user from '../Assets/user.svg'

class Navbar extends Component{

    handleLogOut = async event =>{
        try{
            Auth.signOut(); 
        }catch(error){
            console.log(error.message);
        }
    }
    render(){
        return(
            <div>
                <nav className="navbar"> 

                    <h1>NextConnect</h1>      
                    <p></p>
                    <img className="UserDP" src={user} alt={'user'}/>
                    <div className="user">
                        <p>{this.props.username}</p>
                    </div>

                    <Link to="/"  onClick={this.handleLogOut} >
                        <FaPowerOff />
                    </Link>
                    
                </nav>
            </div>
        )
    }
}
export default Navbar;