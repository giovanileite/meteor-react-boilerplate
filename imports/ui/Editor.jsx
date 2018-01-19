import React, { Component } from 'react'
import { Session } from 'meteor/session'
import { withTracker } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { browserHistory } from 'react-router';

import { Notes } from '../api/notes'

export class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        }
    }
    handleBodyChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        const allNames = { [name]: value };

        this.setState(allNames);
        this.props.call('notes.update', this.props.note._id, allNames);
    }
    handleRemoval = () => {
        this.props.call('notes.remove', this.props.note._id);
        this.props.browserHistory.push('/dashboard');
    }
    componentDidUpdate(prevProps, prevState) {
        const currentNoteId = this.props.note ? this.props.note._id : undefined;
        const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

        if(currentNoteId && currentNoteId !== prevNoteId) {
            this.setState({
                title: this.props.note.title,
                body: this.props.note.body
            })
        }
    }
    render() {
        if(this.props.note) {
            return (
                <div>
                    <input name="title" type="text" value={this.state.title} placeholder="Your title here" onChange={this.handleBodyChange.bind(this)}/>
                    <textarea name="body" value={this.state.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)}></textarea>
                    <button onClick={ this.handleRemoval }>Delete Note</button>
                </div>
            )
        } else {
            return (
                <p>{ this.props.selectedNoteId ? "Note not found !" : "Pick or create a note to get started !"}</p>
            )
        }
    }
};

Notes.propTypes = {
    note: PropTypes.object,
    selectedNoteId: PropTypes.string,
    call: PropTypes.func.isRequired,
    browserHistory: PropTypes.object.isRequired
};

export default withTracker(props => {
    const selectedNoteId = Session.get('selectedNoteId');
    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        call: Meteor.call,
        browserHistory
    }
 })(Editor);