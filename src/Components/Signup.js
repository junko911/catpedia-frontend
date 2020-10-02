import React from 'react'
import { withRouter } from 'react-router-dom'

import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';

import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText, Popover, PopoverBody, PopoverHeader, Modal, ModalHeader, ModalBody } from 'reactstrap'

class Signup extends React.Component {


    state = {
        poOpen: false,
        modal: false,
        file: ""
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }

    popToggle = () => {
        this.setState({ poOpen: !this.state.poOpen })
    }


    // submitHandler = (event) => {
    //     let userObj = {
    //         username: this.state.username,
    //         name: this.state.name,
    //         password: this.state.password,
    //         bio: this.state.bio
    //     }
    //     event.preventDefault()
    //     this.props.signupHandler(userObj, this.state.file)
    //     this.props.history.push('/cats')
    // }

    handleValidSubmit = (event, values) => {
        event.preventDefault()
        this.props.signupHandler(values, this.state.file)
        this.props.history.push('/cats')
    }

    uploadHandler = e => {
        this.setState({ file: e.target.files[0] })
    }

    render() {

        return (
            <div>
                <Button color="success" onClick={this.toggle}>Signup</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Please Signup</ModalHeader>
                    <ModalBody>
                        <AvForm onValidSubmit={this.handleValidSubmit}>
                            <AvField name="name" label="Name" type="text" errorMessage="Invalid name" validate={{
                                required: { value: true, errorMessage: 'Please enter a name' },
                                pattern: { value: '^[a-zA-Z0-9_ ]*$', errorMessage: 'Your name must be composed only with letter and numbers' },
                                minLength: { value: 6, errorMessage: 'Your name must be between 6 and 16 characters' },
                                maxLength: { value: 16, errorMessage: 'Your name must be between 6 and 16 characters' }
                            }} />
                            <AvField name="username" label="Username" type="text" errorMessage="Invalid username" validate={{
                                required: { value: true, errorMessage: 'Please enter a username' },
                                pattern: { value: '^[A-Za-z0-9]+$', errorMessage: 'Your Username must be composed only with letter and numbers' },
                                minLength: { value: 6, errorMessage: 'Your name must be between 6 and 16 characters' },
                                maxLength: { value: 16, errorMessage: 'Your name must be between 6 and 16 characters' }
                            }} />
                            <AvField name="password" label="Password" type="password" errorMessage="Invalid password" validate={{
                                required: { value: true, errorMessage: 'Please enter a password' },
                                minLength: { value: 6, errorMessage: 'Your name must be between 6 and 16 characters' },
                                maxLength: { value: 16, errorMessage: 'Your name must be between 6 and 16 characters' }
                            }} />
                            <AvField name="bio" label="A bit about yourself" type="text" errorMessage="Invalid About Me" validate={{
                                required: { value: true, errorMessage: 'Please tell us a bit about yourself' },
                                pattern: { value: '^[a-zA-Z0-9_ ]*$', errorMessage: 'Your bio must be composed only with letter and numbers' },
                                minLength: { value: 10, errorMessage: 'Your name must be between 10 and 120 characters' },
                                maxLength: { value: 120, errorMessage: 'Your name must be between 10 and 120 characters' }
                            }} />
                            <AvField name="avatar" label="Profile Pic" type="file" errorMessage="Invalid picture" validate={{
                                required: { value: true, errorMessage: 'Please upload a picture' },
                            }} onChange={this.uploadHandler} />
                            <Button id="Popover1" color="primary">Submit</Button>
                            <Popover placement="bottom" isOpen={this.props.poOpen} target="Popover1" toggle={this.props.popToggle}>
                                <PopoverHeader>Try Again!</PopoverHeader>
                                <PopoverBody>Username or password is Incorrect </PopoverBody>
                            </Popover>
                        </AvForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }


    //     render() {
    //         return (
    //             <div>
    //                 <Button color="success" onClick={this.toggle} style={{ marginRight: "10px" }}>Signup</Button>
    //                 <Modal isOpen={this.state.modal} toggle={this.toggle}>
    //                     <ModalHeader toggle={this.toggle}>Plase Signup</ModalHeader>
    //                     <ModalBody>
    //                         <form onSubmit={this.submitHandler}>
    //                             <div className="modal-body">
    //                                 <input name="username" value={this.state.username} onChange={this.changeHandler} placeholder="Username..."></input>
    //                                 <input name="name" value={this.state.name} onChange={this.changeHandler} placeholder="Name..."></input>
    //                                 <input name="password" value={this.state.password} onChange={this.changeHandler} placeholder="Password..."></input>
    //                                 <input type="file" name="avatar" value={this.state.avatar} onChange={this.uploadHandler} placeholder="Profile Picture..."></input>
    //                                 <input name="bio" value={this.state.bio} onChange={this.changeHandler} placeholder="A little about yourself..."></input>
    //                             </div>
    //                             <div className="modal-footer">
    //                                 <input type="submit" className="btn btn-success" value="Signup" />
    //                             </div>
    //                         </form>
    //                     </ModalBody>
    //                 </Modal>
    //             </div>
    //         )
    //     }
    // }
}

export default withRouter(Signup)

