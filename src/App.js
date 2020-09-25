import React from 'react'
import './App.css';
import Login from './Components/Login'
import Signup from './Components/Signup'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import NavBar from "./Components/Navbar"
import Login from './Components/Login'
import Signup from './Components/Signup'
import CatContainer from './Containers/CatContainer'
import BreedContainer from './Containers/BreedContainer'
import Favorite from './Containers/Favorite'
import { NavLink } from 'reactstrap'

class App extends React.Component {

  state = {
    user: {}
  }

  componentDidMount() { }

  signupHandler = (userObj) => {
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({ user: userObj })
    })
      .then(resp => resp.json())
      .then(console.log)
  }


  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <div className="header">
            <h1>Catpedia</h1>
            <div class="auth">
              <NavLink href="/signup">Sign up</NavLink><NavLink href="/login">Log in</NavLink>
            </div>
          </div>
          <NavBar />
          <Route path="/signup" render={() => <Signup signupHandler={this.signupHandler} />} />
          <Route path="/login" component={Login} />
          <Route path="/cats" component={CatContainer} />
          <Route path="/breeds" component={BreedContainer} />
          <Route path="/favorites" component={Favorite} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
