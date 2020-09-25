import React from 'react'

class BreedCard extends React.Component {

  state = {
    cats: []
  }

  getCats = () => {
    let token = localStorage.getItem("token")
    fetch(`http://localhost:3000/cats?breed_id=${this.props.breed.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
        accept: "application/json"
      }
    })
      .then(r => r.json())
      .then(cats => this.setState({ cats: cats }))
  }

  getCatsImages = () => {
    this.getCats()
    return this.state.cats.map(cat => <img alt={cat.id} src={cat.url}/>)
  }

  render() {
    return (
      <div className="breed-card">
        <h2>{this.props.breed.name}</h2>
        {this.getCatsImages()}
      </div>
    )
  }
}

export default BreedCard
