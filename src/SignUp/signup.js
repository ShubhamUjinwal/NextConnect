import React from 'react';
import './signup.css';
import logo from '../Assets/logo.png';
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
        const { username, email, password } = this.state;
        try{
            const signUpResponse = await Auth.signUp({
                username, 
                password,
                attributes: {
                    email: email
                }
            });
            console.log(signUpResponse);
            this.props.history.push("/confirmUser")
        }catch(error){
            let err = null;
            !error.message ? err = { "message": error} : err = error;
            this.setState({
                errors: {
                    ...this.state.errors,
                    cognito: err
                }
            })
        }
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
                        <h1 id="title">Sign Up</h1>
                        
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
                                placeholder="Username"
                                value={this.state.username}
                                onChange={this.onInputChange}
                            />
                            <br/>
                            <input
                                type="password"
                                className="textbox"
                                id="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.onInputChange}
                            />
                            <br/>
                            
                            <input
                                type="password"
                                className="textbox"
                                id="confirmPassword"
                                placeholder="Confirm password"
                                value={this.state.confirmPassword}
                                onChange={this.onInputChange}
                            />
                            <br/>
                            <br/>
                            <br/>
                            <input
                                className="login-button"
                                type="submit"
                                value="Sign Up"
                            />
                            <p>Have an account?</p>
                            <Link to='/login'>Login</Link>
                        </form>
                    </div>
                    <div className='main-right'>
                        <img className="logo" src={logo} alt={'logo'}/>
                    </div>
                </div>
            </div>
        );

    }
}