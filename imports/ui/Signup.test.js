import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';

import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { Signup } from './Signup'; 
import { createSpy } from 'expect/lib/SpyUtils';

if(Meteor.isClient) {
    describe('Signup', function() {
        describe('#error message', function() {
            const error = 'This is not working';
            const wrapper = mount(<Signup createUser={() => {}}/>);
            it('should show error message', function() {
                wrapper.setState({ error });
                expect(wrapper.find('p').text()).toBe(error); 
            });
            it('should show error message empty', function() {
                wrapper.setState({ error: '' });
                expect(wrapper.find('p').length).toBe(0);
            });
        });

        describe('#form data', function() {
            it('should call createUser with the form data', function() {
                const email = 'giovani@test.com';
                const password = 'password123';
                const spy = expect.createSpy();
                const wrapper = mount(<Signup createUser={spy}/>);

                wrapper.ref('email').value = email;
                wrapper.ref('password').value = password;
                wrapper.find('form').simulate('submit');

                expect(spy.calls[0].arguments[0]).toEqual({ email, password });
            });
            it('should set error if sort password', function() {
                const email = 'giovani@test.com';
                const password = '123                      ';
                // const spy = expect.createSpy();
                const wrapper = mount(<Signup createUser={() => {}}/>);

                wrapper.ref('email').value = email;
                wrapper.ref('password').value = password;
                wrapper.find('form').simulate('submit');

                // expect error state to have length greater than zero
                expect(wrapper.state('error').length).toBeGreaterThan(0);
            });
            it('should set createUser callback errors', function() {
                const password = 'password123!';
                const reason = 'This is why it failed';
                const spy = expect.createSpy();
                const wrapper = mount(<Signup createUser={spy}/>);

                wrapper.ref('password').value = password;
                wrapper.find('form').simulate('submit');

                spy.calls[0].arguments[1]({ reason });
                expect(wrapper.state('error')).toBe(reason);

                spy.calls[0].arguments[1]();
                expect(wrapper.state('error').length).toBe(0);
            })
        })
    })
}