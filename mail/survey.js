const nodemailer = require('nodemailer');
const smtp = require('nodemailer-smtp-transport');

const keys = require('../config/keys');


exports.sendSurveyLink = (emailRecipients, subject, body) => {
  let res;
  const transporter = nodemailer.createTransport(smtp({ 
    service: 'gmail',
    // secure: true,
    auth: {
      user: keys.email,
      pass: keys.password
    }
  })); 

  const mailOptions = {
    from: 'woguchimaobi@gmail.com',
    to: emailRecipients,
    subject: subject,
    html: body,
  };

  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages', success);
    }
  });

  transporter.sendMail(mailOptions, (err, info) => {
    // new Promise((reject, resolve) => {
    //     if (err) reject(err)
    //     resolve(info)
    // })

    if(err) throw err
    res = info
    return res
  });
  return res
};
