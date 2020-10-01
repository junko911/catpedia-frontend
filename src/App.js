import React from 'react'
import './App.css';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
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
    users: [],
    favCats: []
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
      fetch("http://localhost:3000/api/v1/users", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(users => this.setState({ users: users }))
      fetch("http://localhost:3000/api/v1/user_favs", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
          accept: "application/json"
        }
      })
        .then(r => r.json())
        .then(data => {
          this.setState({ favCats: data })
        })
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
      .then(data => {
        localStorage.setItem("token", data.jwt)
        this.setState({ user: data.user })
      })
  }

  loginHandler = (userInfo) => {
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({ user: userInfo })
    })
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

  followHandler = user => {
    const token = localStorage.getItem("token")
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        id: user.id
      })
    }
    fetch(`http://localhost:3000/api/v1/users/${user.id}/follow`, options)
      .then(res => res.json())
      .then(() => {
        const newFollowers = [...this.state.user.followers, user]
        const newUser = this.state.user
        newUser.followers = newFollowers
        this.setState({ user: newUser })
      })
  }

  unFollowHandler = user => {

    const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/api/v1/users/${user.id}/unfollow`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      .then(res => res.json())
      .then(() => {
        const newFollowers = this.state.user.followers.filter(e => e.id !== user.id)
        const newUser = this.state.user
        newUser.followers = newFollowers
        this.setState({ user: newUser })
      })
  }

  favHandler = cat => {
    let token = localStorage.getItem("token")
    let options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "accept": "applicatoin/json"
      },
      body: JSON.stringify(cat)
    }
    fetch("http://localhost:3000/api/v1/cat_fav", options)
      .then(res => res.json())
      .then(cat => {
        const newFavCats = [...this.state.favCats, cat]
        this.setState({ favCats: newFavCats })
      })
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
            <Switch>
              <Route path="/signup" render={() => <Signup signupHandler={this.signupHandler} />} />
              <Route path="/login" render={() => <Login loginHandler={this.loginHandler} />} />
              <Route path="/cats" render={() => <CatContainer current_user={this.state.user} favHandler={this.favHandler} favCats={this.state.favCats} />} />
              <Route path="/breeds" component={BreedContainer} />
              <Route path="/profile" render={() => <Profile users={this.state.users} current_user={this.state.user} followHandler={this.followHandler} unFollowHandler={this.unFollowHandler} favCats={this.state.favCats} />} />
              <Route path="/upload_image" component={ImageUpload} />
              <Route path="/" render={() => <CatContainer current_user={this.state.user} favHandler={this.favHandler} favCats={this.state.favCats} />} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
