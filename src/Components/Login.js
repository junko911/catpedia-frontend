import React from 'react'

class Login extends React.Component {

    state = {
        username: "",
        password: ""
    }

    changeHandler= (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.loginHandler(this.state)
        this.props.history.push('/')
    }

    render(){
        return (
            <div>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#loginModal">
                Login
                </button>

                {/* <!-- Modal --> */}
                <div className="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="loginModalLabel">Please Login</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={this.submitHandler}>
                                <div className="modal-body">
                                    <input name="username" value={this.state.username} onChange={this.changeHandler} placeholder="Username..."></input>
                                    <input name="password" value={this.state.password} onChange={this.changeHandler} placeholder="Password..."></input>
                                </div>
                                <div className="modal-footer">
                                    <input type="submit" className="btn btn-primary" value="Login"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Login
