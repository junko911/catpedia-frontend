import React from 'react'
import { Card } from 'reactstrap'
import CatCard from '../Components/CatCard'
import FavoriteGallery from '../Components/FavoriteGallery'
import RecommendedUsers from '../Components/RecommendedUsers'

class Profile extends React.Component {

  state = {
    catArray: [],
    isModalOpen: false,
    imagesToShow: 30,
    currentIndex: 0
  }

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  showModalImage = imageId => {
    this.toggleModal();
    this.setState({
      currentIndex: imageId
    })
  }

  renderCats = () => {
    console.log("hello", this.state.catArray)
    return this.state.catArray.map((cat, index) => <CatCard showModalImage={this.showModalImage} url={cat.url} id={cat.id} slide={index} />)
  }

  deleteHandler = (id) => {
    fetch(`http://localhost:3000/likes/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => {
        const newCatArray = this.state.catArray.filter(e => e.id !== id)
        this.setState({ catArray: newCatArray }, () => this.toggleModal())
      })
  }

  componentDidMount() {
    let token = localStorage.getItem("token")
    fetch("http://localhost:3000/user_favs", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
        accept: "application/json"
      }
    })
      .then(r => r.json())
      .then(data => {
        this.setState({ catArray: data })
      })
  }

  getFollowings = () => {
    if (this.props.current_user.followers) {
      if (this.props.current_user.followers.length === 0) {
        return <p>You are not following anyone yet.</p>
      } else {
        return this.props.current_user.followers.map(user => {
          return (
            <li key={user.id}>
              {user.username}
            </li>
          )
        })
      }
    }
    return null
  }

  getFollowers = () => {
    if (this.props.current_user.followeds) {
      if (this.props.current_user.followeds === 0) {
        return <p>You are not followed by anyone yet.</p>
      } else {
        return this.props.current_user.followeds.map(user => {
          return (
            <li key={user.id}>
              {user.username}
            </li>
          )
        })
      }
    }
    return null
  }

  render() {
    return (
      <>
        {
          this.props.current_user && Object.keys(this.props.current_user).length !== 0 ?
            <>
              <Card>Profile Card Here</Card>
              <>
                <div>Following</div>
                <ul>{this.getFollowings()}</ul>
                <div>Followers</div>
                <ul>{this.getFollowers()}</ul>
              </>
              <div style={{ margin: "50px auto", width: "90%" }}>
                <div className="row" >
                  <div className="col-9">
                    <FavoriteGallery favCats={this.state.catArray} deleteHandler={this.deleteHandler} isModalOpen={this.state.isModalOpen} toggleModal={this.toggleModal} />
                  </div>
                  <div className="col-3">
                    <RecommendedUsers users={this.props.users} current_user={this.props.current_user} followHandler={this.props.followHandler} unFollowHandler={this.props.unFollowHandler} />
                  </div>
                </div>
              </div>
            </>
            :
            <div style={{
              width: "90%",
              margin: "50px auto",
              textAlign: "center",
            }}>
              <h4 style={{ textAlign: "center" }}>Please signup or login!</h4>
              <img src="https://http.cat/401" alt="Not authorized" />
            </div>
        }
      </>
    )
  }

}

export default Profile
