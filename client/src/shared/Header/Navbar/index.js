// NAVBAR -- COMPONENT
// ==============================

// IMPORT FROM PACKAGES
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux"


// IMPORT FROM FILES
import "./Navbar.css"
import { logout } from "../../../redux/reducers/auth-reducer"


class Navbar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { isAuthenticated } = this.props
        return (
            <div className="navbar-wrapper">
                <nav>
                    {!isAuthenticated && <div className="nav-link"><Link to="/">Sign Up</Link></div>}
                    {!isAuthenticated && <div className="nav-link"><Link to="/login">Log In</Link></div>}
                    {isAuthenticated && <div className="nav-link"><Link to="/home">Home</Link></div>}
                    <div className="nav-link"><Link to="/about">About</Link></div>
                    {isAuthenticated && <div className="nav-link"><button onClick={this.props.logout}> Logout </button></div>}
                </nav>
            </div>
        )
    }
}

//EXPORTS
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, { logout })(Navbar)
