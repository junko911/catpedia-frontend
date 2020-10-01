import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'

class Signup extends React.Component {

    state = {
        username: "",
        name: "",
        password: "",
        avatar: "",
        bio: "",
        modal: false
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    submitHandler = (event) => {
       let userObj = {
            username: this.state.username,
            name: this.state.name,
            password: this.state.password,
            avatar: this.state.avatar,
            bio: this.state.bio
        }
        event.preventDefault()
        this.props.signupHandler(userObj)
        this.props.history.push('/cats')
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
                                <input name="name" value={this.state.name} onChange={this.changeHandler} placeholder="Name..."></input>
                                <input name="password" value={this.state.password} onChange={this.changeHandler} placeholder="Password..."></input>
                                <input name="avatar" value={this.state.avatar} onChange={this.changeHandler} placeholder="Profile Picture..."></input>
                                <input name="bio" value={this.state.bio} onChange={this.changeHandler} placeholder="A little about yourself..."></input>
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

















