import React, { Component } from 'react'
import { Link } from 'react-router'
import { Meteor } from 'meteor/meteor'
import PropTypes from 'prop-types'
import { compose } from 'react-komposer'

export class Login extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            error: '',
        }
    }
    onSubmit(e) {
        e.preventDefault();
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        this.props.loginWithPassword({email}, password, (err) => {
            if(err) {
                this.setState({
                    error: 'Unable to login. Please check your email and password !'
                });
            } else {
                this.setState({
                    error: ''
                });
            }
        })
    }
    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Login</h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    
                    <form onSubmit={this.onSubmit} noValidate className="boxed-view__form">
                        <input type="email" ref="email" name="email" placeholder="Email" />
                        <input type="password" ref="password" name="password" placeholder="Password"/>
                        <button className="button">Login</button>
                    </form>
                    <Link to="/signup">Have an account?</Link>
                </div>
            </div>
        )
    }
}

export default compose((props, onData) => {
    onData(null, { loginWithPassword: Meteor.loginWithPassword })
})(Login);

Login.propTypes = {
    loginWithPassword: PropTypes.func.isRequired
}
