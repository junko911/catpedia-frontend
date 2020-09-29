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

  next = () => {
    if (this.state.animating) return
    const nextIndex = this.state.activeIndex === this.props.cats.length - 1 ? 0 : this.state.activeIndex + 1
    this.setState({ activeIndex: nextIndex })
  }

  previous = () => {
    if (this.state.animating) return
    const nextIndex = this.state.activeIndex === 0 ? this.props.cats.length - 1 : this.state.activeIndex - 1
    this.setState({ activeIndex: nextIndex })
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

  genAttributes = () => {
    const attributes = ["rare", "hypoallergenic", "hairless", "short_legs"]
    return attributes.map(attr => {
      if (this.props.breed[attr] === 1) {
        return <span><span role="img" aria-label="check">✅</span>&nbsp;{attr[0].toUpperCase() + attr.split('_').join(' ').slice(1)}</span>
      } else {
        return null
      }
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
          next={this.next}
          previous={this.previous}
        >
          {this.slides()}
          <CarouselIndicators items={this.props.cats} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
        </Carousel>
        <div className="breed-details">
          <p>{this.props.breed.description}</p>
          <div className="attributes">{this.genAttributes()}</div>
          <div>{this.genProperties()}</div>
        </div>
      </div>
    )
  }
}

export default BreedCard
