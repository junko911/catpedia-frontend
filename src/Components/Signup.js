import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'

class Signup extends React.Component {

    state = {
        username: "",
        password: "",
        modal: false
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.signupHandler(this.state)
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <Button color="success" onClick={this.toggle}>Signup</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Plase Signup</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.submitHandler}>
                            <div className="modal-body">
                                <input name="username" value={this.state.username} onChange={this.changeHandler} placeholder="Username..."></input>
                                <input name="password" value={this.state.password} onChange={this.changeHandler} placeholder="Password..."></input>
                            </div>
                            <div className="modal-footer">
                                <input type="submit" className="btn btn-success" value="Signup"/>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default withRouter(Signup)

















