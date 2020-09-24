import React from 'react'


class Signup extends React.Component{

    state = {
        username: "",
        password: ""
    }

    changeHandler= (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.signupHandler(this.state)
    }

    render(){
        return(
            <div>
                <form onSubmit={this.submitHandler}>
                    <input name="username" value={this.state.username} onChange={this.changeHandler}></input>
                    <input name="password" value={this.state.password} onChange={this.changeHandler}></input>
                    <button>Signup</button>
                </form>
            </div>

        )
    }
}

export default Signup

















