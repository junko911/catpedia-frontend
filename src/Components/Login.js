import React from 'react'
import { withRouter } from 'react-router-dom'
import { AvForm, AvField } from 'availity-reactstrap-validation';


import { Popover, PopoverHeader, PopoverBody, Button, Modal, ModalHeader, ModalBody } from 'reactstrap'

class Login extends React.Component {
    

    state = {
        poOpen2: false,
        username: "",
        password: "",
        modal: false
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }

    popToggle = () => {
        this.setState({poOpen: !this.state.poOpen})
    }

    changeHandler= (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleValidSubmit = (event, values) => {
        event.preventDefault()
        this.props.loginHandler(values)
        this.props.history.push('/cats')
    }

    render(){
        return (
            <div>
                <Button color="primary" onClick={this.toggle}>Login</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Plase Login</ModalHeader>
                    <ModalBody>
                    <AvForm onValidSubmit={this.handleValidSubmit}>
                    <AvField name="username" label="Name" type="text" errorMessage="Invalid name" validate={{
                          required: {value: true, errorMessage: 'Please enter a name'}
                        }} />
                   <AvField name="password" label="Password" type="password" errorMessage="Invalid password" validate={{
                        required: {value: true, errorMessage: 'Please enter a password'}
                    }} />
                        <Popover placement="bottom" isOpen={this.props.poOpen} target="Popover2" toggle={this.props.popToggle}>
                            <PopoverHeader>Try Again!</PopoverHeader>
                            <PopoverBody>Username or password is Incorrect </PopoverBody>
                        </Popover>
                    <Button id="Popover2" color="primary">Submit</Button>

                        </AvForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

}



export default withRouter(Login)
