// INVALID URL -- COMPONENT
// ==============================

// IMPORT FROM PACKAGES
import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

// CONSTRUCTOR
class InvalidURL extends Component {
    render() {
        let { isAuthenticated } = this.props
        return (
            isAuthenticated ? 
            <Redirect to="home" />
            :
            <Redirect to="/" />
        )
    }
}

// EXPORTS
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, {})(InvalidURL);