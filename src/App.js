import React from 'react'
import './App.css';
import Login from './Components/Login'
import Signup from './Components/Signup'

class App extends React.Component {

  state = {
    user: {}
  }

componentDidMount(){}

signupHandler = (userObj) =>{
  fetch("http://localhost:3000/api/v1/users", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accepts: "application/json"
    },
    body: JSON.stringify({user: userObj})
  })
  .then(resp => resp.json())
  .then(console.log)
}


  render() {
    return(
      <>
        <Signup signupHandler = {this.signupHandler}/>
        <Login />
      </>
    )
  }
}

export default App
