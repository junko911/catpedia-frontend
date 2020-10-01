import React from "react";
import { useState } from 'react'
import {
  Button,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";

class ImageCarousel extends React.Component {

  state = {
    activeIndex: 0,
    animating: false
  }

  componentDidMount() {
    this.setState({ activeIndex: this.props.currentIndex });
  }

  next = () => {
    const { animating, activeIndex } = this.state;
    const { images } = this.props;
    if (animating) return;
    const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  };

  previous = () => {
    const { animating, activeIndex } = this.state;
    const { images } = this.props;
    if (animating) return;
    const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
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

  deleteHandler = () => {
    this.props.deleteHandler(this.props.images[this.state.activeIndex].id)
  }


  favHandler = () => {
    let token = localStorage.getItem("token")

    let data = {
      cat: {
        api_id: this.props.images[this.state.activeIndex].id,
        url: this.props.images[this.state.activeIndex].url
      }
    }


    let options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "accept": "applicatoin/json"
      },
      body: JSON.stringify(data)
    }

    fetch("http://localhost:3000/cat_fav", options)
    // console.log(this.props.images[this.state.activeIndex].id, this.props.images[this.state.activeIndex])
  }


  render() {

    const { images } = this.props;
    const { activeIndex } = this.state;
    // console.log(images, activeIndex)
    const slides = images.map((image, index) => {
      return (
        <CarouselItem
          onExiting={() => this.setAnimating(true)}
          onExited={() => this.setAnimating(false)}
          key={index}
        >
          <div className="d-flex justify-content-center">
            <img src={image.url} alt="" className="img-fluid" />
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
            items={images}
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

        <Button color={this.props.button_color} onClick={this.props.button_color === "success" ? this.favHandler : this.deleteHandler}>{this.props.button_color === "success" ? "Favorite" : "Delete"}</Button>
      </>
    );
  }
}

export default ImageCarousel;
