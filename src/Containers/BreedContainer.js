import React from 'react'
import { Form, Label, Input } from 'reactstrap'
import BreedCard from '../Components/BreedCard'

class BreedContainer extends React.Component {

  state = {
    breeds: [],
    selectedBreed: null,
    cats: []
  }

  getCats() {
    let token = localStorage.getItem("token")
    fetch(`https://catpedia-api.herokuapp.com/api/v1/cats?breed_id=${this.state.selectedBreed.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
        accept: "application/json"
      }
    })
      .then(r => r.json())
      .then(cats => this.setState({ cats }))
  }

  componentDidMount() {
    let token = localStorage.getItem("token")
    fetch("https://catpedia-api.herokuapp.com/api/v1/breeds", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
        accept: "application/json"
      }
    })
      .then(r => r.json())
      .then(breeds => this.setState({ breeds }))
  }

  genOptions = () => {
    return this.state.breeds.map(breed => <option key={breed.id}>{breed.name}</option>)
  }

  selectHandler = e => {
    const breedObj = this.state.breeds.find(breed => breed.name === e.target.value)
    this.setState({ selectedBreed: breedObj }, this.getCats)
  }

  render() {
    return (
      <>
        <Form className="breed">
          <Label for="select-breed">Select Breed</Label>
          <Input type="select" name="select" id="select-breed" onChange={this.selectHandler}>
            <option></option>
            {this.genOptions()}
          </Input>
        </Form>
        {this.state.selectedBreed && <BreedCard breed={this.state.selectedBreed} cats={this.state.cats} />}
      </>
    )
  }
}

export default BreedContainer
