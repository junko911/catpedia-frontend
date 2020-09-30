import React from 'react'
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import NavBar from "./Components/Navbar"
import Login from './Components/Login'
import Signup from './Components/Signup'
import Logout from './Components/Logout'
import CatContainer from './Containers/CatContainer'
import BreedContainer from './Containers/BreedContainer'
import Profile from './Containers/Profile'
import ImageUpload from './Containers/ImageUpload'

class App extends React.Component {

  state = {
    user: {},
    users: []
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token) {
      fetch("http://localhost:3000/api/v1/profile", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(resp => resp.json())
        .then(data => this.setState({ user: data.user }))
    }
    fetch("http://localhost:3000/api/v1/users", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(users => this.setState({ users: users }))
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
    .then(data => this.setState({ user: data.user }))
}

loginHandler = (userInfo) => {

  fetch("http://localhost:3000/api/v1/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json"
    },
    body: JSON.stringify({ user: userInfo })
  }
  )
    .then(r => r.json())
    .then(data => {
      localStorage.setItem("token", data.jwt)
      this.setState({ user: data.user })
    })
}

logoutHandler = () => {
  localStorage.removeItem("token")
  this.setState({ user: null })
}            
            
render() {
  let auth_link
  if (!this.state.user || Object.keys(this.state.user).length === 0) {
    auth_link = <><Signup signupHandler={this.signupHandler} /><Login loginHandler={this.loginHandler} /></>
  } else {
    auth_link = <Logout logoutHandler={this.logoutHandler} />
  }

  return (
    <BrowserRouter>
      <div className="container">
        <div className="header">
          <Link to="/cats"><h1><i className='fas'>&#xf1b0;</i>Catpedia</h1></Link>
          <div className="auth">
            {auth_link}
          </div>
        </div>
        <div className="gallery">
          <NavBar />
          <Route path="/signup" render={() => <Signup signupHandler={this.signupHandler} />} />
          <Route path="/login" render={() => <Login loginHandler={this.loginHandler} />} />
          <Route path="/cats" component={CatContainer} />
          <Route path="/breeds" component={BreedContainer} />
          <Route path="/profile" render={() => <Profile users={this.state.users} current_user={this.state.user}/>} />
          {/* <Route path="/favorites" render={() => <Favorite users={this.state.users} current_user={this.state.user}/>} /> */}
          <Route path="/upload_image" component={ImageUpload} />
        </div>
      </div>
    </BrowserRouter>
  )
}
}

export default App
