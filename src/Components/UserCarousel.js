import React from 'react'
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Alert } from 'reactstrap'
import {Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption} from "reactstrap";


class UserCarousel extends React.Component{

    state = {
        activeIndex: 0,
        animating: false
      }
    
    //   componentDidMount() {
    //     this.setState({ activeIndex: this.props.currentIndex });
    //   }
    
      next = () => {
        const { animating, activeIndex } = this.state;
        const { users } = this.props;
        if (animating) return;
        const nextIndex = activeIndex === users.length - 1 ? 0 : activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
      };
    
      previous = () => {
        const { animating, activeIndex } = this.state;
        const { users } = this.props;
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
    const { users } = this.props;
    const { activeIndex } = this.state;
    // console.log(images, activeIndex)
    const slides = users.map((user, index) => {
      return (
        <CarouselItem
          onExiting={() => this.setAnimating(true)}
          onExited={() => this.setAnimating(false)}
          key={index}
        >
            <div>
        <Row>
        <Col>
          <Card>
            <Row md="6" className="no-gutters">
              <Col className= "pic_container" md="8">
                <div>
                <CardImg
                // className = "profile_pic"
                  top
                  height="50%"
                  src={user.avatar}
                  alt="Card image cap"
                />
                </div>
                <div></div>
              </Col>
              <Col md="4">
                <CardBody>
                  <CardTitle>{user.name}</CardTitle>
                  <CardSubtitle>{user.username}</CardSubtitle>
                  <CardText>
                    {user.bio}
                  </CardText>
                  <Alert color="primary">Followers: {user.followers.length}</Alert>
                  <br/>
                  <br/>
                  <Alert color="primary">Following: {user.followeds.length}</Alert>

                </CardBody>
              </Col>
              </Row>
          </Card>
        </Col>
      </Row>
     </div>
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

}

export default UserCarousel
