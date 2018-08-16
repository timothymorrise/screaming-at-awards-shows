// SIGN UP -- COMPONENT
// ==============================

// IMPORT FROM PACKAGES
import React, { Component } from "react"
import { connect } from "react-redux";


// IMPORT FROM FILES
import SignupForm from "./SignUpForm"
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
        this.props.signup(this.state.inputs)
        this.clearInputs();
    }


    render() {
        let { authErrCode } = this.props;
        let errMsg = "";
        if (authErrCode < 500 && authErrCode > 399) {
            errMsg = "Invalid username or password!";
        } else if (authErrCode > 499) {
            errMsg = "Server error!";
        }
        return (
            <SignupForm
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                errMsg={errMsg}
                {...this.state.inputs}
            />
        )
    }
}


// EXPORTS
const mapStateToProps = (state) => {
    return {
        authErrCode: state.auth.authErrCode.signup
    }
}

export default connect(mapStateToProps, { signup })(SignUp)