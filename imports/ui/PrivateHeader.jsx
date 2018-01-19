import React, { Component } from 'react'
import { Accounts } from 'meteor/accounts-base'
import PropTypes from 'prop-types';

import { compose } from 'react-komposer';


export class PrivateHeader extends Component {
    handleLogout = () => {
        return (
            this.props.handleLogout()
        );
    }
    render() {
        return (
            <div className="title-bar">
                <div className="title-bar__content">
                    <h1 className="title-bar__title">{this.props.title}</h1>
                    <button className="button button--link-text" onClick={ this.handleLogout }>Logout</button>
                </div>
            </div>
        )
    }
}


const options = {
    loadingHandler: () => (<p>Loading...</p>)
};
export default compose((props, onData) => {
    onData( null, { handleLogout: () => Accounts.logout() });
}, options)(PrivateHeader);

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired
}



