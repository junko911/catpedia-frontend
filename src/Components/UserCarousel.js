import React from 'react'
import { Button, Row, Col } from 'reactstrap'
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, } from "reactstrap";
import UserFavCarousel from './UserFavCarousel'



class UserCarousel extends React.Component {

  state = {
    users: [],
    activeIndex: 0,
    animating: false,
    userFavs: [],
    display: false
  }

  userFavsHandler = (id) => {
    console.log(id)
    fetch(`http://localhost:3000/api/v1/users/${id}/cats`)
      .then(r => r.json())
      .then(data => this.setState({ userFavs: data, display: !this.state.display }))

  }

  unFollowHandler = (user) => {
    const { animating, activeIndex } = this.state;
    const { users } = this.state;
    if (animating) return;
    let oldUsers = users
    let index = oldUsers.indexOf(user);
    if (index > -1) { //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
      users.splice(index, 1);
    }
    console.log(oldUsers)
    const nextIndex = activeIndex === users.length - 1 ? 0 : activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
    this.props.unFollowHandler(user)
    this.setState({ activeIndex: nextIndex, display: true })

  }

  componentDidMount() {
    this.setState({ users: this.props.users }, () => this.userFavsHandler(this.state.users[0].id));
  }

  next = () => {
    const { animating, activeIndex } = this.state;
    const { users } = this.state;
    if (animating) return;
    const nextIndex = activeIndex === users.length - 1 ? 0 : activeIndex + 1;
    this.setState({ activeIndex: nextIndex, display: true });
  };

  previous = () => {
    const { animating, activeIndex } = this.state;
    const { users } = this.state;
    if (animating) return;
    const nextIndex = activeIndex === 0 ? users.length - 1 : activeIndex - 1;
    this.setState({ activeIndex: nextIndex, display: true });
  };

  goToIndex = newIndex => {
    const { animating } = this.state;
    if (animating) return;
    this.setState({ activeIndex: newIndex, display: true });
  };

  setAnimating = value => {
    this.setState({
      animating: value
    });
  };

  render() {

    const { users } = this.state;

    const { activeIndex } = this.state;
    const slides = users.map((user, index) => {
      return (
        <CarouselItem
          onExiting={() => this.setAnimating(true)}
          onExited={() => this.setAnimating(false)}
          key={index}
        >
          <Row>
            <Col md="8">
              <div>
                <img alt="" style={{ display: "block", maxWidth: "100%", margin: "auto", height: "300px" }} id="randomImage" className="img-fluid" src={user.avatar ? user.avatar : "https://cdn1.vectorstock.com/i/thumb-large/82/55/anonymous-user-circle-icon-vector-18958255.jpg"} />
              </div>
            </Col>
            <Col md="4">
              <Row>
                <Col>
                  <br />
                  <br />
                  {user.name}
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col>
                  @{user.username}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col id="bio_box">
              Bio: {user.bio}
            </Col>
            <br />
          </Row>
          <Row>
            <Button style={{ display: "block", margin: "20px auto" }} color="info" onClick={() => this.userFavsHandler(user.id)}>Click Me for User Favs</Button>
          </Row>
        </CarouselItem>
      );
    });

    return (
      <>
        <Carousel
          interval={false}
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
          className="user-carousel"
        >
          <CarouselIndicators
            items={users}
            activeIndex={activeIndex}
            onClickHandler={this.goToIndex}

          />
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={this.previous}
            style={{ position: "fixed" }}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={this.next}
          />
        </Carousel>
        <div style={this.state.display ? { display: 'none' } : { display: 'inline' }}>
          {/* <UserFavCarousel currentIndex={0} current_user={this.props.current_user} images={this.state.userFavs}/> */}
          <UserFavCarousel images={this.state.userFavs} userFavs={this.state.userFavs} currentIndex={0} current_user={this.props.current_user} favHandler={this.props.favHandler} unFavHandler={this.props.unFavHandler} favCats={this.props.favCats} />

        </div>
        {/* {this.props.current_user && Object.keys(this.props.current_user).length !== 0 ?
          <Button
          color={this.props.button_color}
          onClick={this.props.button_color === "success" ? this.favHandler : this.deleteHandler}
          style={{ display: "block", margin: "auto" }}
          >
          {this.props.button_color === "success" ? "Favorite" : "Unfavorite"}
          </Button>
          : null
        } */}
      </>
    );
  }
}

export default UserCarousel
