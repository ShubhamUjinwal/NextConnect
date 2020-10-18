import React from "react";
import { Link } from 'react-router-dom';

export default class LandingPage extends React.Component{
    render(){
        return(
            <div id="landingpage">
                <Link to="/"><h1 id="nextconnecttitle">NextConnect</h1></Link>

                <Link id="landingpagelogin" to='/login'>Login</Link>
                <Link id="landingpagelogin" to='/signup'>SignUp</Link>
                
            </div>
        );
    }
}