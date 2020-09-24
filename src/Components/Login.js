import React from 'react'


class Login extends React.Component {

    

    render(){
        return (
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

export default Login