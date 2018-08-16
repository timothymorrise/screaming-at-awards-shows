// PROTECTED ROUTE
// ==============================

// IMPORT FROM FILES
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

// CONSTRUCTOR
class ProtectedRoute extends Component {
    render() {
        const {isAuthenticated, path} = this.props;
        const Component = this.props.component;
        return (
            isAuthenticated ?
                <Route path={path} component={Component} /> :
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
export default connect(mapStateToProps, {})(ProtectedRoute);
