import React from 'react'
import { Button, Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap'
import CatCard from '../Components/CatCard'
import ImageCarousel from '../Components/ImageCarousel'

class CatContainer extends React.Component {

  state = {
   catArray: [],
   isModalOpen: false,
   imagesToShow:30,
   currentIndex: 0
  }

  toggleModal = () => {
    this.setState({isModalOpen: !this.state.isModalOpen})
  }

  showModalImage = imageId => {
    this.toggleModal();
    this.setState({
      currentIndex: imageId
    })
  }

  catSetState = (data) => {
    data.map(catObj => this.setState({catArray: [...this.state.catArray, catObj]}))
  }

  renderCats = () => {
   return this.state.catArray.map((cat, index) => <CatCard showModalImage={this.showModalImage} url={cat.url} breeds={cat.breeds} id={cat.id} slide={index}/>)
  }

  componentDidMount(){
    let token = localStorage.getItem("token")
    fetch("http://localhost:3000/cats", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      }}
    )
    .then(r => r.json())
    .then(this.catSetState)
  }


  render() {
    return (
      <>
      <div id="photos">{this.renderCats()}</div>
       <Modal
            className="modal-xl"
            isOpen={this.state.isModalOpen}
            toggle={this.toggleModal}
       >
         <ModalHeader> Cat Gallery </ModalHeader>
         <ModalBody>
           <Row>
             <Col md="12">
               <ImageCarousel images={this.state.catArray} currentIndex={this.state.currentIndex}/>
             </Col>
           </Row>
         </ModalBody>
            </Modal>


      
      </>
      )
    }
}

export default CatContainer
