import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session'
import { withTracker } from 'meteor/react-meteor-data';

export const NoteListItem = (props) => {
    return (
        <div onClick={() => { props.Session.set('selectedNoteId', props.note._id) }}>
            <h5>{ props.note.title || 'Untitled note' }</h5>
            { props.note.selected ? "Selected" : undefined}
            <p>{moment(props.note.updatedAt).format('M/DD/YY')}</p>
        </div>
    )
}

NoteListItem.propTypes = {
    note: PropTypes.object.isRequired,
    Session: PropTypes.object.isRequired
}

export default withTracker(props => {
    return {
        Session
    }
})(NoteListItem);