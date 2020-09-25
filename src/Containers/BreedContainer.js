import React from 'react'
import { Form, Label, Input } from 'reactstrap'
import BreedCard from '../Components/BreedCard'

class BreedContainer extends React.Component {

  state = {
    breeds: [],
    selectedBreed: {}
  }

  componentDidMount() {
    let token = localStorage.getItem("token")
    fetch("http://localhost:3000/breeds", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
        accept: "application/json"
      }
    })
      .then(r => r.json())
      .then(breeds => this.setState({ breeds: breeds }))
  }

  genOptions = () => {
    return this.state.breeds.map(breed => <option key={breed.id}>{breed.name}</option>)
  }

  selectHandler = e => {
    const breedObj = this.state.breeds.find(breed => breed.name === e.target.value)
    this.setState({ selectedBreed: breedObj })
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
        <BreedCard breed={this.state.selectedBreed} />
      </>
    )
  }
}

export default BreedContainer
