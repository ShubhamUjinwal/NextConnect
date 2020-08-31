import React from 'react';
import './forgotpassword.css';
import logo from '../Assets/logo.png';
import { Auth } from 'aws-amplify';

export default class ForgotPassword extends React.Component{

    state = {
        verificationcode: '',
        email: '',
        newpassword: '',
        errors: {
            cognito: null,
            blankfield: false
        }
    }


    clearErrorState = () =>{
        this.setState({
            errors: {
                cognito: null,
                blankfield: false
            }
        });
    }

    forgotPasswordHandler = async event =>{
        event.preventDefault();
        /* Validation */


        /* AWS Cognito integration here */
        try{
            console.log(this.state.verificationcode)
            await Auth.forgotPasswordSubmit(
                this.state.email,
                this.state.verificationcode,
                this.state.newpassword
            );
            this.props.history.push('/login'); 
        }catch(error){
            console.log(error);
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
                        <h1 id="title">Change Password</h1>
                        
                        <form onSubmit={this.forgotPasswordHandler}>
                            <input
                                type="text"
                                className="textbox"
                                placeholder="enter 6-digit code"
                                id="verificationcode"
                                value={this.state.verificationcode}
                                onChange={this.onInputChange}
                            />
                            <br/>
                            <input
                                type="text"
                                className="textbox"
                                placeholder="Email"
                                id="email"
                                value={this.state.email}
                                onChange={this.onInputChange}
                            />
                            <br/>
                            <input
                                type="password"
                                className="textbox"
                                placeholder="New password"
                                id="newpassword"
                                value={this.state.newpassword}
                                onChange={this.onInputChange}
                            />
                            <br/>
                            <br/>
                            <br/>
                            <input
                                className="login-button"
                                type="submit"
                                value="Submit"
                            />
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