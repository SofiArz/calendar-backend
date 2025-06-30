const { response } = require('express')

const createUser = (req, res = response) => {
    const { name, email, password } = req.body

    res.status(200).json({
        ok: true,
        msg: 'register',
        name,
        email,
        password
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