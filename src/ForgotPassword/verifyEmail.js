import React from 'react';
import './verifyEmail.css';
import logo from '../Assets/logo.png';
import { Auth } from 'aws-amplify';

export default class VerifyEmail extends React.Component{

    state = {
        email: '',
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

            
            await Auth.forgotPassword(this.state.email);
         
            this.props.history.push('/forgotPassword'); 
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
                        <h1 id="title">Verify Email</h1>
                        
                        <form onSubmit={this.forgotPasswordHandler}>
                            <input
                                type="text"
                                className="textbox"
                                placeholder="Email"
                                id="email"
                                value={this.state.email}
                                onChange={this.onInputChange}
                            />
                            <br/>
                            <br/>
                            <br/>
                            <input
                                className="login-button"
                                type="submit"
                                value="send"
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