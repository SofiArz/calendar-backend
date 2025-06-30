const { Router } = require('express');
const router = Router();

const { createUser, authenticateUser, refreshToken } = require('../controllers/auth')

router.post('/register', createUser)

router.post('/login', authenticateUser)

router.get('/refresh', refreshToken)

module.exports = router;