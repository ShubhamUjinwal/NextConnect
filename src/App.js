import React from 'react';
import './App.css';
import DisplayPost from './components/displayPosts'
import SignUp from './SignUp/signup'
import ConfirmUser from './SignUp/confirmUser'
import Login from './Login/login'
import ForgotPassword from './ForgotPassword/forgotpassword'
import VerifyEmail from './ForgotPassword/verifyEmail'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Auth } from 'aws-amplify';


class App extends React.Component{

  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUser = user => {
    this.setState({ user: user});
  }

  async componentDidMount() {
    try{
      // const session = await Auth.currentSession();
      this.setAuthStatus(true);
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
    }catch(error){
      console.log(error);
    }
    this.setState({isAuthenticating: false});
  }

  render(){
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    }
  return (
    <div className="App">
      
      <Router>
        <Switch>
          <Route path="/" exact render={(props) => <Login {...props} auth={authProps} />} />
          <Route path="/dashboard" render={(props) => <DisplayPost {...props} auth={authProps} />} />
          <Route path="/signup" render={(props) => <SignUp {...props} />} />
          <Route path="/verifyEmail" render={(props) => <VerifyEmail {...props} />} />
          <Route path="/forgotPassword" render={(props) => <ForgotPassword {...props} />} />
          <Route path="/confirmUser" render={(props) => <ConfirmUser {...props} />} />
        </Switch>
      </Router>
      
    </div>
  );
}
}
export default App;
