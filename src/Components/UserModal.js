import React from 'react'
import { Button, Row, Col, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap'
import UserCarousel from './UserCarousel'
import UserCardCarousel from './UserFavCarousel'

class UserModal extends React.Component {

    state = {
        isModalOpen: this.props.userModal
    }

    componentDidMount() {

    }

    toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }

    render() {

        return (
            <>
                <Modal
                    className="modal-lg"
                    isOpen={this.props.userModal}
                    toggle={this.props.toggleModal}
                >
                    <ModalHeader style={{ margin: "auto" }}>
                        <UserCarousel userFavsHandler={this.props.userFavsHandler} current_user={this.props.current_user} favCats={this.props.favCats} unFollowHandler={this.props.unFollowHandler} users={this.props.users} favHandler={this.props.favHandler} unFavHandler={this.props.unFavHandler} />
                    </ModalHeader>
                    <ModalBody>
                        {/* <UserCardCarousel currentIndex={0} current_user= {this.props.current_user} images ={this.props.favCats}/> */}
                    </ModalBody>
                </Modal>
            </>
        )
    }

}

export default UserModal
