import React, { Component } from 'react'
import './css/navbar.css'
import { Link } from 'react-router-dom';
import {Auth} from 'aws-amplify'
import { FaPowerOff } from 'react-icons/fa'
import { listUsers } from '../graphql/queries'
import { Storage, API, graphqlOperation} from 'aws-amplify'
import user from '../Assets/user.svg'


class Navbar extends Component{

    state = {
        ownerId: "",
        ownerUsername: "",
        ownerEmail: "",
        userDp: [],
        userDpUrl:"",
    }

    componentDidMount= async () =>{
        await Auth.currentUserInfo()
            .then(user => {
                this.setState(
                    {
                        ownerId: user.attributes.sub,
                        ownerUsername: user.attributes.name,
                        ownerEmail: user.attributes.email,   
                    }
                    
                )
            })
        this.getDP()
    }

    
    getDP = async () => {
        const result = await API.graphql(graphqlOperation(listUsers, {
            filter: {id: {eq: this.state.ownerEmail}}
        } ));
        if (result.data.listUsers.items.length !== 0)
            this.setState({ userDp: result.data.listUsers.items[0]})
    }

    handleLogOut = async event =>{
        try{
            Auth.signOut(); 
        }catch(error){
            console.log(error.message);
        }
    }

    render(){
        const { userDp } = this.state
        return(
            <div>
                <nav className="navbar"> 
                    <Link to="/dashboard">
                        <h1>NextConnect</h1>      
                    </Link>
                    <p></p>
                    <Link to="/userProfile" >
                        <img className="UserDP" src={userDp.length === 0? user : userDp.userDP} alt={'user'}/>
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