const { response } = require('express');
const Event = require('../models/event');

const getEvents = async (req, res = response) => {

    try {
        const events = await Event.find()
            .populate('user', 'name');

        return res.status(200).json({
            ok: true,
            events
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'An unexpected error has occurred on our server.'
        });
    }
}

const createEvent = async (req, res = response) => {

    try {
        const event = new Event(req.body);
        event.user = req.uid;
        const savedResult = await event.save();

        return res.status(201).json({
            ok: true,
            event: savedResult
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error ?? 'An unexpected error has occurred on our server.'
        });
    }
}

const updateEvent = async (req, res = response) => {

    try {
        const eventId = req.params.id;

        const event = await Event.findById(eventId);
      
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found'
            });
        }

        if (event.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Unauthorized'
            });
        }

        const newEvent = {
            ...req.body,
            user: req.uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

        return res.status(200).json({
            ok: true,
            event: updatedEvent
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'An unexpected error has occurred on our server.'
        });
    }
}

const deleteEvent = async (req, res = response) => {

    try {
        return res.status(200).json({
            ok: true,
            msg: 'Delete event successful'
        });
    }
    catch (error) {
        return res.status(500).json()({
            ok: false,
            msg: 'An unexpected error has occurred on our server.'
        });
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}