import React from 'react'

function LoginForm(props) {
    return (
        <div className="auth-form-wrapper">
            <form onSubmit={props.handleSubmit}>
                <h3>Log In</h3>
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
                <button type="submit">Submit</button>
                <p className="error-message">{props.errMsg}</p>
            </form>
        </div>
    )
}

export default LoginForm 
