import React from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'

class Logout extends React.Component {

    state = {
        modal: false
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }

    render(){
        return (
            <div>
                <Button color="primary" onClick={this.toggle}>Logout</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Are you sure you want to logout?</ModalHeader>
                    <ModalBody>
                      <Button color="success" onClick={this.props.logoutHandler}>Yes</Button>
                      <Button color="secondary" onClick={this.toggle}>No, I changed my mind</Button>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default Logout
