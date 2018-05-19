// NAVBAR -- COMPONENT
// ==============================

// IMPORT FROM PACKAGES
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import {connect} from "react-redux"

// IMPORT FROM FILES
import "./Navbar.css"



class Navbar extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    render() {
        return (
            <div className="nav-wrapper">
                <nav>
                    <div className="nav-link"><Link to="/">Home</Link></div>
                    <div className="nav-link"><Link to="/about">About</Link></div>
                    <div className="nav-link"><Link to="/contact">Contact</Link></div>
                    <div className="nav-link"><button> </button></div>
                </nav>
            </div>
        )
    }
}

export default componentName
