const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

// serialize user
passport.serializeUser((user, done) => done(null, user.id));

// deserialize user
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

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
      User.findOne({ userid: profile.id }).then((currentUser) => {
        if (!currentUser) {
          // create new user
          let newUser = new User({
            userid: profile.id,
            username: profile.displayName,
            thumbnail: profile._json.picture,
          });
          // save new user into db
          newUser
            .save()
            .then((user) => done(null, user))
            .catch((err) =>
              console.log('Unable to create new user', err.message)
            );
        } else {
          // already have the user
          done(null, currentUser);
        }
      });
    }
  )
);
