const passport = require('passport');
// const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Survey = require('../models/Survey');

exports.passportAuth1 =  passport.authenticate('google', { scope: ['profile', 'email'] });

exports.passportAuth2 = passport.authenticate('google');

exports.passportFacebookAuth = passport.authenticate('facebook');

exports.passportFacebookAuth2 = passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' });

// exports.passportLocalAuth = passport.authenticate('basic', { session: false }), (req, res) => {
//     res.send(req.user);
// };

exports.passportAuth2Callback = (req, res) => {
  // Successful authentication, redirect to surveys page.
  res.redirect('/');
}

// exports.passportRegisterUser = (req, res) => {
//   const email = req.body.email;
//   const fullName = req.body.fullName;
//   const password = req.body.password;
//   const firstNameArr = fullName.split(' ');
//   const firstName = firstNameArr[0];
//   bcrypt.hash(password, 12)
//   	.then(hashedPw => {
//   		const user = new User({
//   			email: email,
//   			password: hashedPw,
//   			displayName: fullName,
//   			firstName: firstName
//   		});
//   		return user.save();
//   	})
//   	.then(result => {
//   		res.status(201).json({ message: 'User created successfully', userId: result._id});
//   	})
//   	.catch(err => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//   	})
// }
//
exports.returnLoggedUser = (req, res) => {
  if(req.user) {
    Survey.find({_user: req.user._id}).countDocuments()
    .then(count => {
      res.status(200).json({ user: req.user, surveyNo: count });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    })
  }

}
