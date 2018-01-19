import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';

export const NoteListHeader = (props) => {
    return (
        <div>
            <button onClick={() => { props.meteorCall('notes.insert', (err, res) => {
                if(res) {
                    props.Session.set('selectedNoteId', res);
                }
            }) 
            }}>Create Notes
            </button>
        </div>
    )
}

NoteListHeader.propTypes = {
    meteorCall: PropTypes.func.isRequired,
    Session: PropTypes.object.isRequired
}

export default withTracker(props => {
    return {
        meteorCall: Meteor.call,
        Session
    }
})(NoteListHeader);
