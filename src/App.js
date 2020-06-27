import React from 'react';
import './App.css';
import DisplayPost from './components/displayPosts'
import { withAuthenticator } from 'aws-amplify-react'

function App() {
  return (
    <div className="App">
 
      <DisplayPost />
      
    </div>
  );
}

export default withAuthenticator(App, { includesGreetings: true });
