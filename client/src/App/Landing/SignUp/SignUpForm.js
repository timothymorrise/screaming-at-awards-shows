import React from 'react'

function SignupForm(props) {
    return (
        <div className="auth-form-wrapper">
        <form onSubmit = {props.handleSubmit}>
            <h3>Signup</h3>
            <input className="auth-input"
                name="name"
                onChange={props.handleChange}
                value={props.name}
                type="text"
                placeholder="Name" />
            <input className="auth-input"
                name="username"
                onChange={props.handleChange}
                value={props.username}
                type="text"
                placeholder="Username" />
            <input className="auth-input"
                name="password"
                onChange={props.handleChange}
                value={props.password}
                type="text"
                placeholder="Password" />
            <button className="auth-button" type="submit">Create Account</button>
            <p>{props.errMsg}</p>
            </form> 
        </div>
    )
}

export default SignupForm
