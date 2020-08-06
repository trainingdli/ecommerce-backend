const config = require('./config');
const jwt = require('jsonwebtoken');
const authenticate = (req, res, next) => {
    let credentials = req.headers['credentials'];
    const tokens = credentials.split(':');
    let username = tokens[0];
    let password = tokens[1];
    if (username === config.username && password === config.password) {
        next();
    } else {
        res.status(401);
        res.send({error: 'unauthorized', errorDescription: 'Invalid token'});
    }
}

const basicAuth = (req, res, next) => {
    let credentials = req.headers['authorization'];
    if (credentials) {
        credentials = credentials.replace('Basic', '');
        const decodedString = new Buffer(credentials, 'base64').toString();
        const tokens = decodedString.split(':');
        let username = tokens[0];
        let password = tokens[1];
        if (username === config.username && password === config.password) {
            next();
        } else {
            res.status(401);
            res.send({error: 'unauthorized', errorDescription: 'Invalid token'});
        }
    } else {
        res.status(401);
        res.send({error: 'unauthorized', errorDescription: 'Required token'});
    }
}

const jwtAuthentication = async (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            const jwtToken  = req.headers['authorization'];
            const isValid = await jwt.verify(jwtToken, config.secret);
            if (isValid) {
                next();
            } else {
                res.status(401);
                res.send({error: 'unauthorized', errorDescription: 'Invalid token'}); 
            }
        } catch(error) {
            res.status(401);
            res.send({error: 'unauthorized', errorDescription: 'Invalid token'}); 
        }
    } else {
        res.status(401);
        res.send({error: 'unauthorized', errorDescription: 'Required token'});
    }
}

module.exports = jwtAuthentication;


