const passport = require('passport');
const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const User = require('../models/User');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const keys = require('../config/keys');
// const User = mongoose.model('user');

passport.use(new FacebookStrategy({
    clientID: keys.facebookAppID,
    clientSecret: keys.facebookAppSecret,
    callbackURL: "/auth/facebook/callback",
    proxy: true
  },
  function(accessToken, refreshToken, profile, done) {
    const facebookID = profile.id;
    const displayName = profile.displayName;
    const firstName = profile.name.givenName;
    const email = profile.email;
    const profilePhoto = profile.profileUrl;

    User.findOne({facebookId: facebookID})
    .then(existingUser => {
      if(existingUser) {
        done(null, existingUser);
      } else {
        const user = new User({
          facebookId: facebookID,
          firstName: firstName,
          displayName: displayName,
          email: email,
          profilePhoto: profilePhoto
        });
        user.save()
        .then(user => {
          done(null, user);
        })
        .catch(err => console.log(err))
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
));

passport.serializeUser((user, done) => { // To generate a token using user._id to send to the client as cookie
  done(null, user.id);
});

passport.deserializeUser((id, done) => { // To remove server token
  User.findById(id)
  .then(user => {
    done(null, user);
  })
})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback",
    proxy: true
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    const googleID = profile.id;
    const displayName = profile.displayName;
    const firstName = profile.name.givenName
    const email = profile.emails[0].value;
    const profilePhoto = profile.photos[0].value;

    User.findOne({googleId: googleID})
    .then(existingUser => {
      if(existingUser) {
        done(null, existingUser);
      } else {
        const user = new User({
          googleId: googleID,
          firstName: firstName,
          displayName: displayName,
          email: email,
          profilePhoto: profilePhoto
        });
        user.save()
        .then(user => {
          done(null, user);
        })
        .catch(err => console.log(err))
      }
    })
    .catch(err => {
      console.log(err);
    })



  }
));
