import React from 'react'

function SignupForm(props) {
    return (
        <div className="auth-form-wrapper">
        <form onSubmit = {props.handleSubmit}>
            <h3>Signup</h3>
            <input name="name"
                onChange={props.handleChange}
                value={props.name}
                type="text"
                placeholder="Name" />
            <input name="username"
                onChange={props.handleChange}
                value={props.username}
                type="text"
                placeholder="Username" />
            <input name="password"
                onChange={props.handleChange}
                value={props.password}
                type="text"
                placeholder="Password" />
            <button type="submit">Create Account</button>
            <p>{props.errMsg}</p>
            </form> 
        </div>
    )
}

export default SignupForm
