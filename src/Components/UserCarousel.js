import React from 'react'
import {Button, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Alert } from 'reactstrap'
import {Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption} from "reactstrap";
import ImageCarousel from './ImageCarousel'



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
                <img id= "randomImage" className="img-fluid" src="https://upload.wikimedia.org/wikipedia/commons/6/6a/A_blank_flag.png"/>
            </Col>
            <Col md="4">
              <Row>
                <Col>
                <br/>
                <br/>
                {user.name}
                </Col>
               

              </Row>
              <br></br>
              <Row>
                <Col>
                {user.username}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col id="bio_box">
            This is my fake bio i want it to be decently long so that i can see how it fills up some space thanks a ton
            </Col>
          </Row>
    </CarouselItem>
      );
    });

    return (
      <>
        <Carousel
        interval= {false}
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
        <ImageCarousel currentIndex={0} current_user={this.props.current_user} images={this.props.images}/>
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
