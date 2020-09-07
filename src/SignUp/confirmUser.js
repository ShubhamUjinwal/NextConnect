import React from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';

export default class SignUp extends React.Component{

    state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: {
            cognito: null,
            blankfield: false,
            passwordmatch: false
        }
    }


    clearErrorState = () =>{
        this.setState({
            errors: {
                cognito: null,
                blankfield: false,
                passwordmatch: false
            }
        });
    }

    handleSubmit = async event =>{
        event.preventDefault();
        /* Validation */

        /* AWS Cognito integration here */
        const { username, email, } = this.state;
        Auth.confirmSignUp(email, username)
        .then(() => console.log("Confirmed sign up."))
        .catch(err => console.log(err))
        this.props.history.push("/login")
    }

    onInputChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render(){
        return(
            <div id='login'>
                <div className='main'>
                    <div className='main-left'>
                        <h1 id="title">Confirm User</h1>
                        
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                className="textbox"
                                id="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.onInputChange}
                            />
                            <br/>

                            <input
                                type="text"
                                className="textbox"
                                id="username"
                                placeholder="Code"
                                value={this.state.username}
                                onChange={this.onInputChange}
                            />
                            <br/>
                    
                            <br/>
                            <br/>
                        
                            <input
                                className="login-button"
                                type="submit"
                                value="Confirm"
                            />
                            <p>Have an account?</p>
                            <Link to='/login'>Login</Link>
                        </form>
                    </div>
                    <div className='main-right'>
                    <p id="nextconnect">NextConnect</p>
                    </div>
                </div>
            </div>
        );

    }
}