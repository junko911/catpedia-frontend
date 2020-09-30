import React from 'react'
import { Button, Row, Col, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap'
import CatCard from '../Components/CatCard'
import ImageCarousel from '../Components/ImageCarousel'

class Profile extends React.Component{

    
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
        console.log("hello", this.state.catArray)
       return this.state.catArray.map((cat, index) => <CatCard showModalImage={this.showModalImage} url={cat.url} id={cat.id} slide={index}/>)
      }

    componentDidMount(){
            let token = localStorage.getItem("token")
            fetch("http://localhost:3000/user_favs", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json",
                accept: "application/json"
            }}
            )
            .then(r => r.json())
            .then(this.catSetState)
    }

render() {

    let moreCats = 'More!' + '\xa0\xa0'
    // console.log(this.state.catArray)
    return (
      <>
      <div id="photos">{this.renderCats()}</div>
      <Button onClick={this.clickHandler} color="primary" size="lg">{moreCats}<i className="fas fa-cat"></i>

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
               <ImageCarousel images={this.state.catArray} delete_fav = {this.props.delete_fav} currentIndex={this.state.currentIndex} button_color= {"danger"} />
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

export default Profile