import React from 'react'
import { Card, Row, Col, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap'
import CatCard from '../Components/CatCard'
import FavoriteGallery from '../Components/FavoriteGallery'
import ImageCarousel from '../Components/ImageCarousel'
import RecommendedUsers from '../Components/RecommendedUsers'
import { withRouter } from 'react-router-dom'


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

  // catSetState = (data) => {
  //   data.map(catObj => this.setState({ catArray: [...this.state.catArray, catObj] }))
  // }

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
        this.setState({ catArray: newCatArray, isModalOpen: false }, () => this.props.history.push('/profile'))
      })
    // this.setState({ catArray: [], isModalOpen: false }, this.componentDidMount)
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
    }
    )
      .then(r => r.json())
      .then(this.catSetState)
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
    let moreCats = 'More!' + '\xa0\xa0'
    return (
      <>
        {this.props.current_user && Object.keys(this.props.current_user).length !== 0 ?
          <>
            <Card>Profile Card Here</Card>
            {/* <div id="photos">{this.renderCats()}</div>

        <Modal
          className="modal-xl"
          isOpen={this.state.isModalOpen}
          toggle={this.toggleModal}
        >
          <ModalHeader> Cat Gallery </ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                <ImageCarousel images={this.state.catArray} deleteHandler={this.deleteHandler} currentIndex={this.state.currentIndex} button_color={"danger"} />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>

          </ModalFooter>
        </Modal> */}

            <>
              <div>Following</div>
              <ul>{this.getFollowings()}</ul>
              <div>Followers</div>
              <ul>{this.getFollowers()}</ul>
            </>
            <div style={{ margin: "50px auto", width: "90%" }}>
              <div className="row" >
                <div className="col-9">
                  <FavoriteGallery favCats={this.state.catArray} deleteHandler={this.deleteHandler} />
                </div>
                <div className="col-3">
                  <RecommendedUsers users={this.props.users} current_user={this.props.current_user} followHandler={this.props.followHandler} unFollowHandler={this.props.unFollowHandler} />
                </div>
              </div>
            </div>
          </>
          :
          <h3>Please signup or login!</h3>
        }
      </>
    )
  }

}

export default withRouter(Profile)
