import React from 'react'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
} from 'reactstrap';

class BreedCard extends React.Component {

  state = {
    activeIndex: 0,
    animating: false,
    setAnimating: false
  }

  getCatsImages() {
    return this.props.cats.map(cat => <img key={cat.id} width="100" alt={cat.id} src={cat.url} />)
  }

  next= () => {
    if (this.state.animating) return
    const nextIndex = this.state.activeIndex === this.props.cats.length - 1 ? 0 : this.state.activeIndex + 1
    this.setState({ activeIndex: nextIndex })
  }

  previous= () => {
    if (this.state.animating) return
    const nextIndex = this.state.activeIndex === 0 ? this.props.cats.length - 1 : this.state.activeIndex - 1
    this.setState({ activeIndex: nextIndex })
  }

  goToIndex = (newIndex) => {
    debugger
    if (this.state.animating) return
    this.setState({ activeIndex: newIndex })
  }

  slides = () => {
    return this.props.cats.map((cat) => {
      return (
        <CarouselItem
          onExiting={() => this.setState({ setAnimating: true })}
          onExited={() => this.setState({ setAnimating: false })}
          key={cat.id}
        >
          <img src={cat.url} alt={cat.id}/>
        </CarouselItem>
      );
    });
  }

  render() {
    return (
      <div className="breed-card">
        <h2>{this.props.breed.name}</h2>
        <i>Origin: {this.props.breed.origin}</i>
        <Carousel
          activeIndex={this.state.activeIndex}
          next={this.next}
          previous={this.previous}
        >
          {this.slides()}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
        <h4>📝Description</h4>
        <p>{this.props.breed.description}</p>
        <div className="details">
          <span>🧒🏻 Child friendly: {this.props.breed.child_friendly}</span>
          <span>🐶 Dog friendly: {this.props.breed.dog_friendly}</span>
          <span>⚡️ Energy level: {this.props.breed.energy_level}</span>
          <span>✏️ Intelligence: {this.props.breed.intelligence}</span>
          <span>🐑 Shedding level: {this.props.breed.shedding_level}</span>
          <span>🗣 Social needs: {this.props.breed.social_needs}</span>
          <span>🦸🏻 Stranger friendly: {this.props.breed.stranger_friendly}</span>
          <span>🚫 hypoallergenic: {this.props.breed.hypoallergenic}</span>
        </div>
      </div>
    )
  }
}

export default BreedCard
