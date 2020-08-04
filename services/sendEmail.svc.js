const nodemailer = require('nodemailer');
const config = require('../config');

const sendEmail = {
    sendEmail: (data) => {
        return new Promise( (resolve, reject) => {
            const frontEndUrl = `${config.frontEndUrl}/resetPassword/?token=${data.randomToken}&expiry=${data.expiry}&username=${data.username}`
            const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'trainingdli2@gmail.com',
              pass: 'training@123'
            }
          });
          const mailOptions = {
            from: 'trainingdli2@gmail.com',
            to: data.username,
            subject: 'Reset Password',
            html: `
                <html>
                    <head></head>

                    <body>
                        <h3>Reset Password</h3>
                        <h3>Hi ${data.firstname} ${data.lastname}</h3>
                        <a href="${frontEndUrl}">Reset Password Link</a>
                    </body>
                </html>
            `
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
              reject(error);
            } else {
              resolve(info.response);
            }
          });
        })
    }
}

module.exports = sendEmail;