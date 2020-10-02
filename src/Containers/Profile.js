import React from 'react'
import { Card, Col, CardImg, Row, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'
import CatCard from '../Components/CatCard'
import FavoriteGallery from '../Components/FavoriteGallery'
import RecommendedUsers from '../Components/RecommendedUsers'
import UserModal from '../Components/UserModal'

class Profile extends React.Component {

  state = {
    isModalOpen: false,
    imagesToShow: 30,
    currentIndex: 0,
    userModal: false,
    modalUsers: []
  }

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  renderFollowers = () => {
    this.toggleUserModal()
    this.setState({ modalUsers: this.props.current_user.followers, userModal: !this.state.userModal })
  }

  renderFollowing = () => {
    this.toggleUserModal()
    this.setState({ modalUsers: this.props.current_user.followeds, userModal: !this.state.userModal })
  }

  toggleUserModal = () => {
    this.setState({ userModal: !this.state.userModal })
  }

  showModalImage = imageId => {
    this.toggleModal();
    this.setState({
      currentIndex: imageId
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

  unFavHandler = api_id => {
    this.toggleModal()
    this.props.unFavHandler(api_id)
  }

  render() {
    return (
      <>
        {
          this.props.current_user && Object.keys(this.props.current_user).length !== 0 ?
            <>
              <Row>
                <Col>
                  <Card>
                    <Row className="no-gutters">
                      <Col className="pic_container" md="4">
                        <CardImg
                          className="profile_pic"
                          top
                          width="100%"
                          src="https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_2560%2Cc_limit/phonepicutres-TA.jpg"
                          alt="Card image cap"
                        />
                      </Col>
                      <Col md="4">
                        <CardBody>
                          <CardTitle>{this.props.current_user.name}</CardTitle>
                          <CardSubtitle>@{this.props.current_user.username}</CardSubtitle>
                          <CardText>
                            Bio: {this.props.current_user.bio}
                          </CardText>
                          <Button onClick={this.renderFollowers}>Followers: {this.props.current_user.followers.length}</Button>
                          <br />
                          <br />
                          <Button onClick={this.renderFollowing}>Following: {this.props.current_user.followeds.length}</Button>

                        </CardBody>
                      </Col>
                      <Col md="4">
                        <CardBody
                          className="Recommended"
                          top="true"
                          width="100%"
                        >
                          <RecommendedUsers users={this.props.users} current_user={this.props.current_user} followHandler={this.props.followHandler} unFollowHandler={this.props.unFollowHandler} />
                        </CardBody>

                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
              <div style={{ margin: "50px auto", width: "90%" }}>
                <div className="row" >
                  <div className="col-12">
                    <FavoriteGallery favCats={this.props.favCats} favHandler={this.props.favHandler} unFavHandler={this.unFavHandler} isModalOpen={this.state.isModalOpen} current_user={this.props.current_user} toggleModal={this.toggleModal} />
                  </div>
                </div>
              </div>
              <UserModal users={this.state.modalUsers} userModal={this.state.userModal} toggleModal={this.toggleUserModal} />
            </>
            :
            <div style={{
              width: "90%",
              margin: "50px auto",
              textAlign: "center",
            }}>
              <h4 style={{ textAlign: "center" }}>Please signup or login!</h4>
              {/* <img src="/images/placeholder-image.png" alt="Not authorized" /> */}
            </div>
        }
      </>
    )
  }

}

export default Profile
