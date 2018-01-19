import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';

import { NoteList } from './NoteList';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {
    describe('NoteList', function() {
        it('should render NoteListItem for each note', function(){
            const wrapper = mount(<NoteList todos={notes}/>);

            expect(wrapper.find('NoteListItem').length).toBe(2);
            expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
        });
        it('should render NoteListItem if zero notes', function() {
            const wrapper = mount(<NoteList todos={[]}/>);

            expect(wrapper.find('NoteListItem').length).toBe(0);
            // expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
        });
    })
}