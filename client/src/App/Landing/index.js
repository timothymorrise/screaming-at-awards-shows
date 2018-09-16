// LANDING PAGE COMPONENT
// ==============================

// IMPORT FROM PACKAGES
import React, { Component } from 'react';
import { Link } from "react-router-dom";

// IMPORT FROM FILES 
import "./Landing.css"
import SignUp from "./SignUp"

// COMPONENT FUNCTION
class Landing extends Component {
    render() {
        return (
            <div className="landing-wrapper"> 
                <SignUp/>
                <Link to="/login">Already have an account? Click here to Login!</Link>
            </div>
        )
    }
}

// EXPORTS
export default Landing