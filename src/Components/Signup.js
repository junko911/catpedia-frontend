import React from 'react'
import { withRouter } from 'react-router-dom'

import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';

import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText, Popover, PopoverBody, PopoverHeader, Modal, ModalHeader, ModalBody } from 'reactstrap'


class Signup extends React.Component {


    state = {
<<<<<<< HEAD
        poOpen: false,
        modal: false,
=======
        username: "",
        name: "",
        password: "",
        bio: "",
        modal: false,
        file: ""
>>>>>>> Set patch http request for user image
    }

    handleValidSubmit = (event, values) => {
        console.log(event, values)
         event.preventDefault()
         this.props.signupHandler(values)
         this.props.history.push('/cats')
     }

      render(){

      return (
        <div>
            <Button color="success" onClick={this.toggle}>Signup</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Please Signup</ModalHeader>
                <ModalBody>
                    <AvForm onValidSubmit={this.handleValidSubmit}>
                    <AvField name="name" label="Name" type="text" errorMessage="Invalid name" validate={{
                          required: {value: true, errorMessage: 'Please enter a name'},
                          pattern: {value: '^[a-zA-Z0-9_ ]*$', errorMessage: 'Your name must be composed only with letter and numbers'},
                          minLength: {value: 6, errorMessage: 'Your name must be between 6 and 16 characters'},
                          maxLength: {value: 16, errorMessage: 'Your name must be between 6 and 16 characters'}
                        }} />
                    <AvField name="username" label="Username" type="text" errorMessage="Invalid username" validate={{
                        required: {value: true, errorMessage: 'Please enter a username'},
                        pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Your Username must be composed only with letter and numbers'},
                        minLength: {value: 6, errorMessage: 'Your name must be between 6 and 16 characters'},
                        maxLength: {value: 16, errorMessage: 'Your name must be between 6 and 16 characters'}
                    }} />
                    <AvField name="password" label="Password" type="password" errorMessage="Invalid password" validate={{
                        required: {value: true, errorMessage: 'Please enter a password'},
                        minLength: {value: 6, errorMessage: 'Your name must be between 6 and 16 characters'},
                        maxLength: {value: 16, errorMessage: 'Your name must be between 6 and 16 characters'}
                    }} />
                    <AvField name="bio" label="A bit about yourself" type="text" errorMessage="Invalid About Me" validate={{
                        required: {value: true, errorMessage: 'Please tell us a bit about yourself'},
                        pattern: {value: '^[a-zA-Z0-9_ ]*$', errorMessage: 'Your bio must be composed only with letter and numbers'},
                        minLength: {value: 10, errorMessage: 'Your name must be between 10 and 120 characters'},
                        maxLength: {value: 120, errorMessage: 'Your name must be between 10 and 120 characters'}
                    }} />
                    <AvField name="avatar" label="Profile Pic" type="text" errorMessage="Invalid picture" validate={{
                        required: {value: true, errorMessage: 'Please upload a picture'},
                    }} />
                    <Button id="Popover1" color="primary">Submit</Button>
                    <Popover placement="bottom" isOpen={this.props.poOpen} target="Popover1" toggle={this.props.popToggle}>
                            <PopoverHeader>Try Again!</PopoverHeader>
                            <PopoverBody>Username or password is Incorrect </PopoverBody>
                        </Popover>
                    </AvForm>
                </ModalBody>
            </Modal>
        </div>
    )}

    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }

    popToggle = () => {
        this.setState({poOpen: !this.state.poOpen})
    }

<<<<<<< HEAD
    // changeHandler = (event) => {
    //     this.setState({ [event.target.name]: event.target.value })
    // }

  

    // canBeSubmitted() {
    //     const errors = validate(this.state.name, this.state.name, this.state.username, this.state.bio, this.state.avatar, this.state.password);
    //     const isDisabled = Object.keys(errors).some(x => errors[x]);
    //     return !isDisabled;
    //   }

    //   handleBlur = field => evt => {
    //     this.setState({
    //       touched: { ...this.state.touched, [field]: true }
    //     });
    //   };

    // render() {

    //     const errors = validate(this.state.name, this.state.name, this.state.username, this.state.bio, this.state.avatar, this.state.password);
    //     const isDisabled = Object.keys(errors).some(x => errors[x]);
    
    //     const shouldMarkError = field => {
    //       const hasError = errors[field];
    //       const shouldShow = this.state.touched[field];
    
    //       return hasError ? shouldShow : false;
    //     };
    

    //     return (
    //         <div>
    //             <Button color="success" onClick={this.toggle}>Signup</Button>
    //             <Modal isOpen={this.state.modal} toggle={this.toggle}>
    //                 <ModalHeader toggle={this.toggle}>Plase Signup</ModalHeader>
    //                 <ModalBody>
    //                     <form onSubmit={this.submitHandler}>
    //                         <div className="modal-body">
    //                             <input className={shouldMarkError("username") ? "error" : ""} onBlur={this.handleBlur("username")} name="username" value={this.state.username} onChange={this.changeHandler} placeholder="Username..."></input>
    //                             <input className={shouldMarkError("name") ? "error" : ""} onBlur={this.handleBlur("name")} name="name" value={this.state.name} onChange={this.changeHandler} placeholder="Name..."></input>
    //                             <input className={shouldMarkError("password") ? "error" : ""} onBlur={this.handleBlur("password")} type="password" name="password" value={this.state.password} onChange={this.changeHandler} placeholder="Password..."></input>
    //                             <input className={shouldMarkError("avatar") ? "error" : ""} onBlur={this.handleBlur("avatar")} name="avatar" value={this.state.avatar} onChange={this.changeHandler} placeholder="Profile Picture..."></input>
    //                             <input className={shouldMarkError("bio") ? "error" : ""} onBlur={this.handleBlur("bio")} name="bio" value={this.state.bio} onChange={this.changeHandler} placeholder="A little about yourself..."></input>
    //                         </div>
    //                         <div className="modal-footer">
    //                             {/* <Button type="submit" color="success" id="Popover1" value="Signup"></Button> */}
    //                             <input disabled={isDisabled} id="Popover1" type="submit" className="btn btn-success" value="Signup"/>
    //                             <Popover placement="bottom" isOpen={this.state.poOpen} target="Popover1" toggle={this.popToggle}>
    //                                 <PopoverHeader>Try Again!</PopoverHeader>
    //                                 <PopoverBody>This username is already taken</PopoverBody>
    //                             </Popover>
    //                         </div>
    //                     </form>
    //                 </ModalBody>
    //             </Modal>
    //         </div>
    //     )
    // }
=======
    submitHandler = (event) => {
        let userObj = {
            username: this.state.username,
            name: this.state.name,
            password: this.state.password,
            bio: this.state.bio
        }
        event.preventDefault()
        this.props.signupHandler(userObj, this.state.file)
        this.props.history.push('/cats')
    }

    uploadHandler = e => {
        this.setState({ file: e.target.files[0] }) 
    }

    render() {
        return (
            <div>
                <Button color="success" onClick={this.toggle} style={{ marginRight: "10px" }}>Signup</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Plase Signup</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.submitHandler}>
                            <div className="modal-body">
                                <input name="username" value={this.state.username} onChange={this.changeHandler} placeholder="Username..."></input>
                                <input name="name" value={this.state.name} onChange={this.changeHandler} placeholder="Name..."></input>
                                <input name="password" value={this.state.password} onChange={this.changeHandler} placeholder="Password..."></input>
                                <input type="file" name="avatar" value={this.state.avatar} onChange={this.uploadHandler} placeholder="Profile Picture..."></input>
                                <input name="bio" value={this.state.bio} onChange={this.changeHandler} placeholder="A little about yourself..."></input>
                            </div>
                            <div className="modal-footer">
                                <input type="submit" className="btn btn-success" value="Signup" />
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
>>>>>>> Set patch http request for user image
}

export default withRouter(Signup)



// this works in the modal

// <div className='wrapper'>
// <div className='form-wrapper'>
//   <h2>Create Account</h2>
//   <form onSubmit={this.handleSubmit} noValidate>
//     <div className='name'>
//       <label htmlFor="name">Name</label>
//       <input type='text' name='name' onChange={this.handleChange} noValidate />
//       {errors.name.length > 0 && 
//         <span className='error'>{errors.name}</span>}
//     </div>
//     <div className='username'>
//       <label htmlFor="username">Username</label>
//       <input type='text' name='username' onChange={this.handleChange} noValidate />
//       {errors.username.length > 0 && 
//         <span className='error'>{errors.username}</span>}
//     </div>
//     <div className='password'>
//       <label htmlFor="password">Password</label>
//       <input type='password' name='password' onChange={this.handleChange} noValidate />
//       {errors.password.length > 0 && 
//         <span className='error'>{errors.password}</span>}
//     </div>
//     <div className='bio'>
//       <label htmlFor="bio">A little about yourself:</label>
//       <input type='text' name='bio' onChange={this.handleChange} noValidate />
//       {errors.bio.length > 0 && 
//         <span className='error'>{errors.bio}</span>}
//     </div>
//     <div className='avatar'>
//       <label htmlFor="avatar">Profile Picture</label>
//       <input type='text' name='avatar' onChange={this.handleChange} noValidate />
//       {errors.bio.length > 0 && 
//         <span className='error'>{errors.avatar}</span>}
//     </div>
//     <div className='info'>
//       <small>Password must be eight characters in length.</small>
//     </div>
//     <div className='submit'>
//       <button>Submit</button>
//     </div>
//   </form>
// </div>
// </div>

















