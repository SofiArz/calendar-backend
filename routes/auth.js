const { Router } = require('express');
const { check } = require('express-validator');
const { validateRequestFields } = require('../middlewares/fields-validator')

const { createUser, authenticateUser, refreshToken } = require('../controllers/auth')
const router = Router();

router.post(
    '/register',
    [//middlewares
        check('name', 'Name is required.').not().isEmpty(),
        check('email', 'Email is required.').isEmail(),
        check('password', 'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, and one number.')
            .isLength({ min: 8 })
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
        validateRequestFields
    ],
    createUser)

router.post('/login',
    [//middlewares
        check('email', 'Email is required.').isEmail(),
        check('password', 'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, and one number.')
            .isLength({ min: 8 })
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
        validateRequestFields
    ],
    authenticateUser)

router.get('/refresh', refreshToken)

module.exports = router;