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
    }

    render(){
        return (
            <div>
            <form onSubmit={this.submitHandler}>
                <input name="username" value={this.state.username} onChange={this.changeHandler}></input>
                <input name="password" value={this.state.password} onChange={this.changeHandler}></input>
                <button>Login</button>
            </form>
        </div>
        )
    }

}

export default Login
