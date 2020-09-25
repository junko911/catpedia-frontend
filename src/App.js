import React from 'react'
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
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

  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token) {
      fetch("http://localhost:3000/api/v1/profile", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(resp => resp.json())
      .then(data => this.setState({user: data.user}))
    }
  }

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
      .then(data => this.setState({user: data.user}))
  }

  loginHandler = (userInfo) => {
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({user: userInfo})
      }
    )
    .then(r => r.json())
    .then(data => {
      localStorage.setItem("token", data.jwt)
      this.setState({user: data.user})
    })
  }

  logoutHandler = () => {
    debugger
    localStorage.removeItem("token")
    this.setState({user: null})
  }


  render() {
    let auth_link
    if (Object.keys(this.state.user).length === 0) {
      auth_link = <><NavLink href="/signup">Sign up</NavLink><NavLink href="/login">Log in</NavLink></>
    } else {
      auth_link = <NavLink onClick={this.logoutHandler} href="/logout">Log out</NavLink>
    }

    return (
      <BrowserRouter>
        <div className="container">
          <div className="header">
            <h1>Catpedia<i className='fas'>&#xf1b0;</i></h1>
            <div className="auth">
              {auth_link}
            </div>
          </div>
          <NavBar />
          <Route path="/signup" render={() => <Signup signupHandler={this.signupHandler} />} />
          <Route path="/login" render={() => <Login loginHandler={this.loginHandler}/>} />
          <Route path="/cats" component={CatContainer} />
          <Route path="/breeds" component={BreedContainer} />
          <Route path="/favorites" component={Favorite} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
