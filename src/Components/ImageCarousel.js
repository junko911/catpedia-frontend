import React from "react";
import {
  Button,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
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

  // favHandler = () => {
  //   let data = {
  //     cat: {
  //       api_id: this.props.images[this.state.activeIndex].api_id,
  //       url: this.props.images[this.state.activeIndex].url
  //     }
  //   }
  //   this.props.favHandler(data)
  // }

  favHandler = () => {
    const id = this.props.images[this.state.activeIndex].api_id ? this.props.images[this.state.activeIndex].api_id : this.props.images[this.state.activeIndex].id
    this.props.favHandler(id)
  }

  unFavHandler = () => {
    const id = this.props.images[this.state.activeIndex].api_id ? this.props.images[this.state.activeIndex].api_id : this.props.images[this.state.activeIndex].id
    this.props.unFavHandler(id)
  }

  render() {
    let id = 0
    if (this.props.images[this.state.activeIndex]) {
      id = this.props.images[this.state.activeIndex].api_id ? this.props.images[this.state.activeIndex].api_id : this.props.images[this.state.activeIndex].id
    }
    const fav = this.props.favCats.filter(cat => cat.api_id === id).length > 0
    const { images } = this.props
    const { activeIndex } = this.state;
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
        {this.props.current_user && Object.keys(this.props.current_user).length !== 0 ?
          <>
            {
              fav ?
                <>
                  <Button
                    color="danger"
                    onClick={this.unFavHandler}
                    style={{ display: "block", margin: "auto" }}
                  >
                    Unfavorite
                  </Button>
                </>
                :
                <>
                  <Button
                    color="success"
                    onClick={this.favHandler}
                    style={{ display: "block", margin: "auto" }}
                  >
                    Favorite
                  </Button>
                </>
            }
          </>
          : null
        }
      </>
    );
  }
}

export default ImageCarousel;
