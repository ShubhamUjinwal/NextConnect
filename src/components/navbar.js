import React, { Component } from 'react'
import './css/navbar.css'
import { Link } from 'react-router-dom';
import {Auth} from 'aws-amplify'
import { FaPowerOff } from 'react-icons/fa'
import { Storage } from 'aws-amplify'
import user from '../Assets/user.svg'


class Navbar extends Component{

    state = {
        ownerEmail: "",
        dp: [],
        userDpUrl:"",
    }

    componentDidMount= async () =>{
        await Auth.currentUserInfo()
            .then(user => {
                this.setState(
                    {
                        ownerEmail: user.attributes.email,   
                    }
                )
            })
        this.getDP()
    }

    
    getDP = async () => {
        const result = await Storage.list('userDp/')
        this.setState({dp: result})
    }

    handleLogOut = async event =>{
        try{
            Auth.signOut(); 
        }catch(error){
            console.log(error.message);
        }
    }

    render(){
        const { dp, ownerEmail } = this.state
        let userDpUrl=""
        return(
            <div>
                <nav className="navbar"> 
                    <Link to="/dashboard">
                        <h1>NextConnect</h1>      
                    </Link>
                    <p></p>

                    { 
                        dp.map((dp) => {
                            const x = dp.key.split('/')
                            if(x[1] === ownerEmail)
                                userDpUrl="https://ncimages144521-nc.s3.amazonaws.com/public/"+dp.key
                            return null
                        })   
                    }

                    <Link to="/userProfile" >
                     
                        <img className="UserDP" src={userDpUrl === "" ? user : userDpUrl} alt={'user'}/>
                    </Link>
                    <div className="user">
                        <p>{this.props.username}</p>
                    </div>

                    <Link className="logout" to="/"  onClick={this.handleLogOut} >
                        <FaPowerOff />
                    </Link>
                    
                </nav>
            </div>
        )
    }
}
export default Navbar;