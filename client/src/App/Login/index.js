// LOGIN -- COMPONENT
// ==============================

// IMPORT FROM PACKAGES
import React, { Component } from 'react'
import {connect} from "react-redux";

// IMPORT FROM FILES
import {login} from "../../redux/reducers"


// CONSTRUCTOR
 class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                username: "",
                password: ""
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.clearInputs = this.clearInputs.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        let { name, value } = e.target
        this.setState(prevState => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [name]: value
                }
            }
        })
    }

    clearInputs() {
        this.setState({
            inputs: {
                username: "",
                password: ""
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state.inputs)
        this.clearInputs();
    }


    render() {
        return <form onSubmit={this.handleSubmit}>
                <h3>Log In</h3>
                <input name="username"
                        onChange={this.handleChange}
                        value={this.username}
                        type="text"
                        placeholder="Username"/>
                <input name="password"
                        onChange={this.handleChange}
                        value={this.password}
                        type="text"
                        placeholder="Password"/>
                <button type="submit">Submit</button>
        </form>
    }


}

export default connect(null, {connect})(Login)
