const { response } = require('express');

const getEvents = async (req, res = response) => {

    try {
        return res.status(200).json({
            ok: true,
            msg: 'Get events successful'
        })
    }
    catch (error) {
        return res.status(500).json()({
            ok: false,
            msg: 'An unexpected error has occurred on our server.'
        })
    }
}

const createEvent = async (req, res = response) => {

    try {
        return res.status(201).json({
            ok: true,
            msg: 'Create event successful'
        })
    }
    catch (error) {
        return res.status(500).json()({
            ok: false,
            msg: 'An unexpected error has occurred on our server.'
        })
    }
}

const updateEvent = async (req, res = response) => {

    try {
        return res.status(200).json({
            ok: true,
            msg: 'Update event successful'
        })
    }
    catch (error) {
        return res.status(500).json()({
            ok: false,
            msg: 'An unexpected error has occurred on our server.'
        })
    }
}

const deleteEvent = async (req, res = response) => {

    try {
        return res.status(200).json({
            ok: true,
            msg: 'Delete event successful'
        })
    }
    catch (error) {
        return res.status(500).json()({
            ok: false,
            msg: 'An unexpected error has occurred on our server.'
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}