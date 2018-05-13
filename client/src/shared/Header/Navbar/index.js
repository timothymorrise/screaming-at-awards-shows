// NAVBAR -- COMPONENT
// ==============================

// IMPORT FROM PACKAGES
import React from 'react'
import { Link } from "react-router-dom";

// IMPORT FROM FILES
import "./Navbar.css"

function componentName() {
    return (
        <div className="nav-wrapper">
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </nav>
        </div>
    )
}

export default componentName
