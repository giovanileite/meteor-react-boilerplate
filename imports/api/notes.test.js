import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

if(Meteor.isServer) {
    describe('notes', function() {
        const noteOne = {
            _id: 'testNoteId1',
            title: 'My Title',
            body: 'My body for note',
            updatedAt: 0,
            userId: 'testUserId1'
        }
        const noteTwo = {
            _id: 'testNoteId2',
            title: 'Things to buy',
            body: 'Couch',
            updatedAt: 0,
            userId: 'testUserId2'
        }
        beforeEach(function() {
            Notes.remove({});
            Notes.insert(noteOne);
            Notes.insert(noteTwo);
        })
        // INSERT
        describe('#Insert-Notes', function() {
            it('should insert new note if I am logged in -- UserID exist', function() {
                const userId = 'w3e44r5gvaaa2';
                // com APPLY eu injeto um userId e retorno um ID
                const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });
                const db = Notes.findOne({ _id, userId });
                expect(db).toExist();
            });
            it('should not insert note if I am not logged in -- UserID that do not exist', function() {
                expect(() => {
                    // Para inserir dados tenho que estar logado
                    Meteor.server.method_handlers['notes.insert']();
                }).toThrow()
            });
        });
        // REMOVE
        describe('#Remove-Note', function() {
            // Checando se estou logado com UserID correto para remover
            it('should not remove notes if unauthenticated -- logged in', function() {
                expect(() => {
                    Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
                }).toThrow();
            });
            // Checando se o item que estou removendo é realmente ele -- pegando o ID
            it('should remove note -- cheking ID', function() {
                // alimentando o db com dados
                Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId}, [noteOne._id]);
                const db = Notes.findOne({ _id: noteOne._id });
                expect(db).toNotExist();
            });
            // Checando se items sem ID serao inseridos
            it('should not remove notes if invalid _id', function() {
                expect(() => {
                    Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId });
                }).toThrow();
            })
        });
        // UPDATE
        describe('#Update-Note', function() {
            // Checando se estou logado com UserID correto para remover
            it('should not update notes if unauthenticated -- logged in', function() {
                expect(() => {
                    Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
                }).toThrow();
            });
            // Checando se o item que estou removendo é realmente ele -- pegando o ID
            it('should update note', function() {
                const title = 'This is an updated title';
                Meteor.server.method_handlers['notes.update'].apply({
                    userId: noteOne.userId
                }, [
                    noteOne._id,
                    // es6 - title: title
                    { title }
                ])

                const note = Notes.findOne(noteOne._id);
                // observar se o updatedAt foi atualizado
                expect(note.updatedAt).toBeGreaterThan(0);
                expect(note).toInclude({
                    title,
                    body: noteOne.body
                });
            });
            it('it should throw error if extra updates', function() {
                expect(() => {
                    const title = 'This is an updated title';
                    Meteor.server.method_handlers['notes.update'].apply({
                        userId: noteOne.userId
                    }, [
                        noteOne._id,
                        { 
                            title:  title, 
                            name: 'Giovani'
                        }
                    ])
                }).toThrow();
            });
            // Checando se o UserID que está alterando é o mesmo que criou a postagem
            it('should not update note if user was not creator', function() {
                const title = 'This is an updated title';
                Meteor.server.method_handlers['notes.update'].apply({
                    userId: 'w3e44r5gvaaa2'
                }, [
                    noteOne._id,
                    {
                        title
                    }
                ]);
                const note = Notes.findOne(noteOne._id);
                expect(note).toInclude(noteOne);
            });
            it('should not update notes if invalid _id', function() {
                expect(() => {
                    Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId });
                }).toThrow();
            })
        });

        // PUBLICATION
        describe('#Publication-Notes', function() {
            it('should return a user notes by the UserID', function() {
                const res = Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId });
                const notes = res.fetch();

                expect(notes.length).toBe(1);
                expect(notes[0]).toEqual(noteOne);
            });
            it('should return no notes for a user that has none', function() {
                const res = Meteor.server.publish_handlers.notes.apply({ userId: 'w3e44r5gvaaa2' });
                const notes = res.fetch();

                expect(notes.length).toBe(0);
            })
        })
    })
}
