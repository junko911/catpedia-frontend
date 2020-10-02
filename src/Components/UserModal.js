import React from 'react'
import { Button, Row, Col, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap'
import UserCarousel from './UserCarousel'
import ImageCarousel from './ImageCarousel'

class UserModal extends React.Component{

    state= {
        isModalOpen: this.props.userModal
    }

    componentDidMount(){

    }

    toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen })
      }

    render(){

        return(
            <>
            <Modal
              className="modal-lg"
              isOpen={this.props.userModal}
              toggle={this.props.toggleModal}
            >
                <ModalHeader>
                <UserCarousel current_user={this.props.current_user} images={this.props.favCats} unFollowHandler={this.props.unFollowHandler} users={this.props.users}/>
                </ModalHeader>
                <ModalBody>
                {/* <ImageCarousel currentIndex={0} current_user= {this.props.current_user} images ={this.props.favCats}/> */}
                </ModalBody>
            </Modal>
            </>
        )
    }

}

export default UserModal