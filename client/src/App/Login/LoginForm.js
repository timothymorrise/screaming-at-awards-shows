import React from 'react'

function LoginForm(props) {
    return (
        <div className="auth-form-wrapper login">
            <form onSubmit={props.handleSubmit}>
                <h3>Log In</h3>
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
                <button className="auth-button" type="submit">Submit</button>
                <p className="error-message">{props.errMsg}</p>
            </form>
        </div>
    )
}

export default LoginForm 
