const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };
   
        jwt.sign(
            payload,
            process.env.SECRET_JWT_SEED,
            {
                expiresIn: '2h',
            },
            (err, token) => {
                if (err) {
                    console.error(err);
                    return reject('An unexpected error occurred during authorization.');
                }

                resolve(token);
            }
        );
    });
};

module.exports = {
    generateJWT,
};
