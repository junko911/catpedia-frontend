import React from 'react'
import { Row, Col, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap'
import ImageCarousel from '../Components/ImageCarousel'

class FavoriteGallery extends React.Component {

  state = {
    currentIndex: 0
  }

  showModalImage = index => {
    this.props.toggleModal();
    this.setState({
      currentIndex: index
    })
  }

  getImages = () => {
    return this.props.favCats.map(cat => {
      return (
        <div key={cat.id} className="col">
          <div style={{
            backgroundImage: `url(${cat.url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
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
        <div><i class="fas fa-heart"></i>   Your Favorite Cats ({this.props.favCats.length})</div>
        <div className="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2">
          {this.getImages()}
        </div>
        <Modal
          className="modal-xl"
          isOpen={this.props.isModalOpen}
          toggle={this.props.toggleModal}
        >
          <ModalHeader> Your Favorite Cats </ModalHeader>
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
