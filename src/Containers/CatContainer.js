import React from 'react'
import { Button, Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap'
import CatCard from '../Components/CatCard'
import ImageCarousel from '../Components/ImageCarousel'

export default class CatContainer extends React.Component {

  state = {
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

  renderCats = () => {
    return this.props.cats.map((cat, index) => <CatCard key={cat.id} showModalImage={this.showModalImage} url={cat.url} breeds={cat.breeds} id={cat.id} slide={index} />)
  }

  clickHandler = () => {
    this.props.renderCats()
  }

  render() {
    let moreCats = 'More!' + '\xa0\xa0'
    return (
      <>
        <div id="photos" style={{margin: "auto", width: "90%"}}>{this.renderCats()}</div>
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
                <ImageCarousel images={this.props.cats} currentIndex={this.state.currentIndex} current_user={this.props.current_user} buttonHandler={this.props.buttonHandler} favCats={this.props.favCats}/>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </>
    )
  }
}
