import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import BreedCard from '../Components/BreedCard'

class BreedContainer extends React.Component {

  state = {
    breeds: [],
    selectedBreed: ""
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
    return this.state.breeds.map(breed => <option>{breed.name}</option>)
  }

  render() {
    return (
      <>
        <div>Breed Container</div>
        <Input type="select" name="select" id="select-breed">
          {this.genOptions()}
        </Input>
        <BreedCard breed={this.state.selectedBreed}/>
      </>
    )
  }
}

export default BreedContainer
