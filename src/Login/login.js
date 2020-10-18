import React from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify'; 

class Login extends React.Component{

    state = {
        username: '',
        password: '',
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

    handleSubmit = async event =>{
        event.preventDefault();
        /* Validation */

        /* AWS Cognito integration here */
        try{
            const user = await Auth.signIn(this.state.username, this.state.password);
            console.log(user)
            this.props.history.push("/dashboard")
        }catch(error){
            let err = null;
            !error.message ? err = { "message": error} : err = error;
                this.setState({
                    errors: {
                    ...this.state.errors,
                    cognito: err
                }
            })
            if(error.message === "Custom auth lambda trigger is not configured for the user pool."){
                alert("Enter the correct password")
            }else
            alert(error.message)     
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
                        <Link to="/"><h1 className="page-title">NextConnect</h1></Link>
                        <h1 id="title">Login</h1>
                        
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                className="textbox"
                                placeholder="username or email"
                                id="username"
                                value={this.state.username}
                                onChange={this.onInputChange}
                            />
                            <br/>
                            
                            <input
                                type="password"
                                className="textbox"
                                placeholder="password"
                                id="password"
                                value={this.state.password}
                                onChange={this.onInputChange}
                            />
                            <br/>
                            <div className="forgotpassword">
                                <Link to='/verifyEmail'>Forgot password?</Link>
                            </div>
                            <br/>
                            {/* <div className="rememberme">
                                <label>
                                    <input
                                        type="checkbox"
                                        // checked="checked"
                                        name="remember"
                                    />Remember me
                                </label>
                            </div> */}
                            <br/>
                            <input
                                className="login-button"
                                type="submit"
                                value="Login"
                                to="/"
                            />
       
                            <p>Don't have an account?</p>
                            <Link to='/signup'>Sign Up</Link>
                        </form>
                    </div>

                </div>
            </div>
        );

    }
}
export default Login;