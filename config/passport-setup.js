const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      callbackURL: '/auth/google/redirect',
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      // check if user already exist in db
      User.findOne({ userid: profile.id }).then((isExist) => {
        if (!isExist) {
          // create new user
          let newUser = new User({
            userid: profile.id,
            username: profile.displayName,
          });
          // save new user into db
          newUser
            .save()
            .then((user) => console.log(`New user created: ${user}`))
            .catch((err) =>
              console.log('Unable to create new user', err.message)
            );
        } else {
          // already have the user
          console.log(`currentUser: ${isExist}`);
        }
      });
      done();
    }
  )
);
