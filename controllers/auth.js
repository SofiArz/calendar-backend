const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'An account with this email address already exists.'
            })
        }

        user = new User(req.body);

        //password hashing
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateJWT(user.id, user.name);

        return res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    }
    catch (error) {
        return res.status(500).json()({
            ok: false,
            msg: 'An unexpected error has occurred on our server. Please try again later.'
        })
    }

}

const authenticateUser = async (req, res = response) => {
    const { email, password } = req.body

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect email or password. Please check your credentials and try again.'
            })
        }

        validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect email or password. Please check your credentials and try again.'
            })
        }

        const token = await generateJWT(user.id, user.name);

        return res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    }
    catch (error) {
        return res.status(500).json()({
            ok: false,
            msg: 'An unexpected error has occurred on our server. Please try again later.'
        })
    }
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