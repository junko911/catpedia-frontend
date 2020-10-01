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
                <UserCarousel users={this.props.users}/>
                {/* <ImageCarousel/> */}
            </Modal>
            </>
        )
    }

}

export default UserModal