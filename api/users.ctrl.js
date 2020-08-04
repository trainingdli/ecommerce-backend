const userService = require('../services/user.svc');
const getErrors = require('../services/common.svc');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const sendEmailService = require('../services/sendEmail.svc');

const UserController = {
    register: async (req, res) => {
        try {
            const user = await userService.getUser(req.body.username);
            if (user) {
                res.status(200);
                res.send({ data: 'user already exist', status: 0 });
            } else {
                let hashedPassword = bcrypt.hashSync(req.body.password, 2);
                req.body.password = hashedPassword;
                const savedUser = await userService.create(req.body);
                if (savedUser) {
                    res.status(200);
                    res.send({ data: 'Saved successfully', status: 1 });
                }
            }
        } catch (error) {
            let errors = getErrors(error);
            res.send({ errors });
            res.status(500);
        }
    },
    login: async (req, res) => {
        try {
            const user = await userService.getUser(req.body.username);
            if (user) {
                const result = bcrypt.compareSync(req.body.password, user.password);
                if (result) {
                    const token = jwt.sign({
                        firstname: user.firstname,
                        lastname: user.lastname,
                        userId: user._id,
                        phoneNo: user.phoneNo,
                        username: user.username
                    }, config.secret, { expiresIn: '1h' })
                    res.status(200);
                    res.cookie('sessionToken', token, { expires: new Date(Date.now() + (60 * 60 * 1000)) });
                    res.send({
                        username: user.username,
                        sessionToken: token
                    });
                } else {
                    res.status(200);
                    res.send({ data: 'Password incorrect', status: 0 });
                }
            } else {
                res.status(200);
                res.send({ data: 'Username not found', status: 0 });
            }
        } catch (error) {

        }
    },
    sendEmail: async (req, res) => {
        try {
            const user = await userService.getUser(req.body.username);
            if (user) {
                const randomToken = await userService.getRandomToken(12);
                const expiryDate = Date.now() + 24 * 60 * 60 * 1000
                const updatedUser = await userService.updateUser({ id: user._id, resetPasswordToken: randomToken, resetPasswordTokenExpiry: expiryDate });
                const mailStatus = await sendEmailService.sendEmail({ randomToken, username: updatedUser['username'], firstname: updatedUser['firstname'], lastname: updatedUser['lastname'], expiry: expiryDate })
                res.status(200).send(mailStatus);
            } else {
                res.status(200);
                res.send({ data: 'Username not found' });
            }
        } catch (error) {
            res.status(500).send(error);
        }
    },
    updatePassword: async(req, res) => {
        try {
            const user = await userService.getUser(req.body.username);
            const date = (new Date() <= new Date(Number(req.body.resetPasswordTokenExpiry))) ? true : false;
            console.log(date);
            if (user && user.resetPasswordToken && user.resetPasswordToken === req.body.resetPasswordToken && date) {
                let hashedPassword = bcrypt.hashSync(req.body.password, 2);
                    req.body.password = hashedPassword;
                    const updatedUser = await userService.updateUser({ id: user._id, resetPasswordToken: null, resetPasswordTokenExpiry: null, password:  req.body.password});                
                    res.status(200).send(updatedUser);
            } else {
                res.status(200);
                res.send({ data: 'Username not found/Invalid token/Token expired' });
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = UserController;