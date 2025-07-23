const { Router } = require('express');
const { validateJWT } = require('../middlewares/jwt-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events')
const { check } = require('express-validator');
const { validateRequestFields } = require('../middlewares/fields-validator')

const router = Router();
router.use(validateJWT);

router.get('/', getEvents);

router.post('/', [
    check('title', 'Title is required.').not().isEmpty(),
    check('start', 'Start date is required.')
        .isISO8601()
        .toDate(),
    check('end', 'End date is required.')
        .isISO8601()
        .toDate()
        .custom((end, { req }) => {
            if (new Date(end) <= new Date(req.body.start)) {
                throw new Error('End date must be after start date.');
            }
            return true;
        }),
    validateRequestFields
], createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;