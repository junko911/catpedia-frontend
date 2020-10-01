import React from 'react'
import {Button, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Alert } from 'reactstrap'
import {Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption} from "reactstrap";


class UserCarousel extends React.Component{

    state = {
        users: [],
        activeIndex: 0,
        animating: false
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
        this.setState({activeIndex: nextIndex})
        
      }
    
      componentDidMount() {
        this.setState({ users: this.props.users });
      }
    
      next = () => {
        const { animating, activeIndex } = this.state;
        const { users } = this.state;
        if (animating) return;
        const nextIndex = activeIndex === users.length - 1 ? 0 : activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
      };
    
      previous = () => {
        const { animating, activeIndex } = this.state;
        const { users } = this.state;
        if (animating) return;
        const nextIndex = activeIndex === 0 ? users.length - 1 : activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
      };
    
      goToIndex = newIndex => {
        const { animating } = this.state;
        if (animating) return;
        this.setState({ activeIndex: newIndex });
      };
    
      setAnimating = value => {
        this.setState({
          animating: value
        });
      };
        
  render() {

    const { users } = this.state;
    const { activeIndex } = this.state;
    // console.log(images, activeIndex)
    const slides = users.map((user, index) => {
      return (
      <CarouselItem
          onExiting={() => this.setAnimating(true)}
          onExited={() => this.setAnimating(false)}
          key={index}
        >
          <Row>
            <Col md="8">
            {/* <img className="img-card h-100" width="100%" src="https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_2560%2Cc_limit/phonepicutres-TA.jpg"/> */}
              <Row>
                <Col md="6">
              <img className="img-fluid" width="100%" src="https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_2560%2Cc_limit/phonepicutres-TA.jpg"/>
                </Col>
                <Col md="6">{user.bio}</Col>
              </Row>
            </Col>
            <Col md="4">
              {/* <img className="img-card h-100" width="100%" src="https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_2560%2Cc_limit/phonepicutres-TA.jpg"/> */}
            </Col>
          </Row>
    </CarouselItem>
      );
    });

    return (
      <>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
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
            />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={this.next}
            />
        </Carousel>
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



//   <Row>
//   <Col md="8">
    
//     <Row>
//       <Col md="6">.col-md-6</Col>
//       <Col md="6">.col-md-6</Col>
//     </Row>
//   </Col>
//   <Col md="4">.col-md-4</Col>
// </Row>
}

export default UserCarousel



      //   <Row>
      //     <Col>
      //       <Card>
      //         <Row md="6" className="no-gutters">
      //           <Col className= "pic_container" md="8">
    
      //               <CardImg
      //             // className = "profile_pic"
      //               top
      //               height="50%"
      //               src="https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_2560%2Cc_limit/phonepicutres-TA.jpg"
      //               alt="Card image cap"
      //             />
      //         </Col>
      //         <Col md="4">
      //           <CardBody>
      //             <CardTitle>{user.name}</CardTitle>
      //             <CardSubtitle>{user.username}</CardSubtitle>
      //             <CardText>
      //               {user.bio}
      //             </CardText>
      //             <Alert color="primary">Followers: {user.followers.length}</Alert>
      //             <br/>
      //             <Alert color="primary">Following: {user.followeds.length}</Alert>
      //             <Button color="danger" onClick={() => this.unFollowHandler(user)}>Unfollow</Button>

      //           </CardBody>
      //         </Col>
      //         </Row>
      //     </Card>
      //   </Col>
      // </Row>