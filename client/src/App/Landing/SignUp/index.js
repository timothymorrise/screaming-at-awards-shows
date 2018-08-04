// SIGN UP -- COMPONENT
// ==============================

// IMPORT FROM PACKAGES
import React, { Component } from "react"
import { connect } from "react-redux";


// IMPORT FROM FILES
import { signup } from "../../../redux/reducers/auth-reducer"

// CONSTRUCTOR
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                name: "",
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
                name: "",
                username: "",
                password: ""
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state)
        this.props.signup(this.state.inputs)
        this.clearInputs();
    }


    render() {
        return (
            <form onSubmit = {this.handleSubmit}>
            <h3>Signup</h3>
            <input name="name"
                onChange={this.handleChange}
                value={this.name}
                type="text"
                placeholder="Name" />
            <input name="username"
                onChange={this.handleChange}
                value={this.username}
                type="text"
                placeholder="Username" />
            <input name="password"
                onChange={this.handleChange}
                value={this.password}
                type="text"
                placeholder="Password" />
            <button type="submit">Create Account</button>
            </form>
        )
    }
}


// EXPORTS
const mapStateToProps = () => {

}

export default connect(null, { signup })(SignUp)