import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';

import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';

import NoteListEmptyItem from './NoteListEmptyItem';

export class NoteList extends Component {
    onRedering() {
        const load = this.props.todos.length;

        if (!this.props.notesExists) {
            return <p>Carregando...</p>
        } else {
            return (
                <p>
                    { load === 0 ? <NoteListEmptyItem/> : `NoteList ${load}`  }
                </p>
            )
        }

        {/* if(!this.props.notesExists) {
            return <p>Carregando...</p>
        } else if(load === 0) {
            return <NoteListEmptyItem/>
        } else {
            return <p> NoteList {this.props.todos.length}</p>
        } */}
    }
    render() {
        return (
            <div>
                <NoteListHeader />
                {/* { this.props.notes.length === 0 ? <NoteListEmptyItem/> : undefined} */}
                { this.props.todos.map((todos) => { return <NoteListItem key={todos._id} note={todos}/> }) }
                <div>
                    { this.onRedering() }
                </div>
            </div>
        )
    }
}

NoteList.propTypes = {
    todos: PropTypes.array.isRequired
}

// const options = {
//     loadingHandler: () => (<p>Carregando...</p>)
// };

export default withTracker(props => {
    const selectedNoteId = Session.get('selectedNoteId');
    // Do all your reactive data access in this method.
    // Note that this subscription will get cleaned up when your component is unmounted
    const subscription = Meteor.subscribe('notes'); 
    const loading = !subscription.ready();
    const notes = Notes.find({}, {
        sort: {
            updatedAt: -1
        }
    }).fetch().map((note) => {
        return {
            ...note,
            selected: note._id === selectedNoteId
        }
    });
    const notesExists = !loading && !!notes;

    return {
        loading,
        notes,
        notesExists,
        todos: notesExists ? notes : []
    }
})(NoteList)



