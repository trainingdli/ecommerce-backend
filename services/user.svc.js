const userModel = require('../models/user.model');
const randomBytes = require('randombytes');
class UserService {
    create(data) {
        const user = new userModel(data);
        return user.save();
    }
    getUser(username) {
        return userModel.findOne({username}, {__v: 0})
        .exec();
    }
    getRandomToken(bytes) {
        return new Promise( (resolve, reject) => {
            randomBytes(12, (err, token) => {
                if (err) {
                    console.log(err);
                    reject(err)
                } else {
                    const buffer = new Buffer(token);
                    const string = buffer.toString('hex');
                    console.log(string);
                    resolve(string);
                }
             })
        })
    }
    updateUser(data) {
        return userModel.findByIdAndUpdate(data.id, {resetPasswordToken: data.resetPasswordToken, password: data.password, resetPasswordTokenExpiry: data.resetPasswordTokenExpiry}, {upsert: true})
            .exec();
    }
}

module.exports = new UserService();