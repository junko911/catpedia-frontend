import React from 'react'
import { Row, Col, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap'
import ImageCarousel from '../Components/ImageCarousel'

class FavoriteGallery extends React.Component {

  state = {
    isModalOpen: false,
    currentIndex: 0
  }

  toggleModal = () => {
    this.setState({isModalOpen: !this.state.isModalOpen})
  }

  showModalImage = index => {
    this.toggleModal();
    this.setState({
      currentIndex: index
    })
  }

  getImages = () => {
    return this.props.favCats.map(cat => {
      return (
        <div key={cat.id} className="col">
          <div style={{
            background: `url(${cat.url}),no-repeat, center`,
            backgroundSize: "100% auto",
            width: "170px",
            height: "170px",
            margin: "5px"
          }} onClick={() => this.showModalImage(this.props.favCats.indexOf(cat))}></div>
        </div>
      )
    })
  }

  render() {
    return (
      <>
        <div>Your Favorite Cats</div>
        <div className="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2">
          {this.getImages()}
        </div>
        <Modal
          className="modal-xl"
          isOpen={this.state.isModalOpen}
          toggle={this.toggleModal}
        >
          <ModalHeader> Cat Gallery </ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                <ImageCarousel images={this.props.favCats} deleteHandler={this.props.deleteHandler} currentIndex={this.state.currentIndex} button_color={"danger"} />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

export default FavoriteGallery
