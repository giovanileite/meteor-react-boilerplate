import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom';
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'
import { browserHistory } from 'react-router'

import { Routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration'


Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
    const currentPagePrivacy = Session.get('currentPagePrivacy');

    onAuthChange(isAuthenticated, currentPagePrivacy);
});

Tracker.autorun(() => {
    const selectedNoteId = Session.get('selectedNoteId');
    if (selectedNoteId) {
        browserHistory.replace(`/dashboard/${selectedNoteId}`);
    }
})

Meteor.startup(() => {
    Session.set('selectedNoteId', undefined);
    render(<Routes/>, document.getElementById('render-target'));
});