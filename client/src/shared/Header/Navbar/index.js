// NAVBAR -- COMPONENT
// ==============================

// IMPORT FROM PACKAGES
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import {connect} from "react-redux"


// IMPORT FROM FILES
import "./Navbar.css"
import { logout } from "../../../redux/reducers/auth-reducer"


class Navbar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="nav-wrapper">
                <nav>
                    <div className="nav-link"><Link to="/home">Home</Link></div>
                    <div className="nav-link"><Link to="/about">About</Link></div>
                    <div className="nav-link"><Link to="/contact">Contact</Link></div>
                    <div className="nav-link"><button onClick={this.props.logout}> Logout </button></div>
                </nav>
            </div>
        )
    }
}

export default connect(null, {logout})(Navbar)
