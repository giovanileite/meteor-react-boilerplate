import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'

SimpleSchema.defineValidationErrorTransform(e => {
    // const ddpError = new Meteor.Error(error.message);
    // ddpError.error = 'validation-error';
    // ddpError.details = error.details;
    // return ddpError;
    return new Meteor.Error(400, e.message)
});