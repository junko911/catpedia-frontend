import React from 'react'
import { Button, Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap'
import CatCard from '../Components/CatCard'
import ImageCarousel from '../Components/ImageCarousel'

export default class CatContainer extends React.Component {

  state = {
    catArray: [],
    isModalOpen: false,
    imagesToShow: 30,
    currentIndex: 0
  }

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  showModalImage = imageId => {
    console.log(imageId)
    this.toggleModal();
    this.setState({
      currentIndex: imageId
    })
  }

  catSetState = (data) => {
    data.map(catObj => this.setState({ catArray: [...this.state.catArray, catObj] }))
  }

  renderCats = () => {
    return this.state.catArray.map((cat, index) => <CatCard key={cat.id} showModalImage={this.showModalImage} url={cat.url} breeds={cat.breeds} id={cat.id} slide={index} />)
  }

  APICall = () => {
    fetch("http://localhost:3000/api/v1/cats", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      }
    }
    )
      .then(r => r.json())
      .then(this.catSetState)
  }

  favHandler = () => {
    return console.log(this.state.currentIndex)
  }

  componentDidMount() {
    this.APICall()
  }

  clickHandler = () => {
    this.componentDidMount()
  }


  render() {

    let moreCats = 'More!' + '\xa0\xa0'
    // console.log(this.state.catArray)
    return (
      <>
        <div id="photos">{this.renderCats()}</div>
        <Button
          onClick={this.clickHandler}
          color="primary"
          size="lg"
          style={{
            display: "block",
            margin: "auto",
            marginBottom: "20px"
          }}
        >
          {moreCats}
          < i className="fas fa-cat"></i>

        </Button>{' '}
        <Modal
          className="modal-xl"
          isOpen={this.state.isModalOpen}
          toggle={this.toggleModal}
        >
          <ModalHeader> Cat Gallery </ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                <ImageCarousel images={this.state.catArray} button_color={"success"} currentIndex={this.state.currentIndex} current_user={this.props.current_user} />
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </>
    )
  }
}
