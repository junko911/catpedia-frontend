import React from 'react'
import { Row, Col, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap'

const FavoriteGallery = props => {
  console.log(props.favCats)

  const getImages = () => {
    return props.favCats.map(cat => {
      return (
        <div className="col">
          <div style={{
            background: `url(${cat.url}),no-repeat, center`,
            backgroundSize: "100% auto",
            width: "170px",
            height: "170px",
            margin: "5px"
          }}></div>
        </div>
      )
    })
  }

  return (
    <>
      <div>Your Favorite Cats</div>
      <div className="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2">
        {getImages()}
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
              <ImageCarousel images={this.state.catArray} deleteHandler={this.deleteHandler} currentIndex={this.state.currentIndex} button_color={"danger"} />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>

        </ModalFooter>
      </Modal>
    </>
  )
}

export default FavoriteGallery
