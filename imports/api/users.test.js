import { Meteor } from 'meteor/meteor';
import expect from "expect";

import { validateNewUser } from './users';

if(Meteor.isServer) {
    describe('users', function() {
        it('should allow valid email address', function() {
            const testUser = {
                emails: [
                    {
                        address: 'test@exemple.com'
                    }
                ]
            }
            const res = validateNewUser(testUser);
            expect(res).toBe(true);
        });
        it('should reject invalid email', function() {
            const testUser = {
                emails: [
                    {
                        address: 'test_@_exemple.com'
                    }
                ]
            }
            expect(function() {
                validateNewUser(testUser);
            }).toThrow();
        })
    })
}

// const add = (a,b) => {
//     if(typeof b !== 'number') {
//         return a + a;
//     }
//     return a + b;
// }

// describe('add', function() {
//     it('should add two numbers', function() {
//         const res = add(11,9);

//         expect(res).toBe(21);

//     })
// })