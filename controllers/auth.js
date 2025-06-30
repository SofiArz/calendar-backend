const { response } = require('express')
const User = require('../models/user')

const createUser = async (req, res = response) => {
    //const { name, email, password } = req.body

    const user = new User( req.body );

    await user.save();

    res.status(201).json({
        ok: true,
        msg: 'register',
    })
}

const authenticateUser = (req, res = response) => {
    const { email, password } = req.body

    res.status(200).json({
        ok: true,
        msg: 'login',
        email,
        password
    })
}

const refreshToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'refresh'
    })
}

module.exports = {
    createUser,
    authenticateUser,
    refreshToken

}