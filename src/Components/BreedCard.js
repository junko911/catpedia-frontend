import React from 'react'
import {
  Carousel,
  CarouselItem,
  CarouselIndicators
} from 'reactstrap';
import BreedProperty from './BreedProperty';

class BreedCard extends React.Component {

  state = {
    activeIndex: 0,
    animating: false,
    setAnimating: false
  }

  getCatsImages() {
    return this.props.cats.map(cat => <img key={cat.id} width="100" alt={cat.id} src={cat.url} />)
  }

  goToIndex = (newIndex) => {
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
          <img src={cat.url} alt={cat.id} />
        </CarouselItem>
      )
    })
  }

  genProperties = () => {
    const properties = [{ child_friendly: "🧒🏻" }, { dog_friendly: "🐶" }, { energy_level: "⚡️" }, { intelligence: "✏️" }, { shedding_level: "🐑" }, { social_needs: "👥" }, { stranger_friendly: "🦸🏻" }]
    return properties.map(property => <BreedProperty key={properties.indexOf(property)} level={this.props.breed[Object.keys(property)[0]]} propertyName={Object.keys(property)[0]} emoji={Object.values(property)[0]} />)
  }

  render() {
    return (
      <div className="breed-card">
        <h2>{this.props.breed.name}</h2>
        <i>Origin: {this.props.breed.origin}</i>
        <Carousel
          activeIndex={this.state.activeIndex}
        >
          {this.slides()}
          <CarouselIndicators items={this.props.cats} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
        </Carousel>
        <div className="breed-details">
          <p>{this.props.breed.description}</p>
          {this.genProperties()}
        </div>
      </div>
    )
  }
}

export default BreedCard
