const { Schema, model } = require('mongoose');

const eventSchema = Schema({

    title: {
        type: String,
        require: true
    },
    notes: {
        type: String,
        require: false
    },
    start: {
        type: Date,
        require: true
    },
    end: {
        type: Date,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})

module.exports = model('Event', eventSchema)