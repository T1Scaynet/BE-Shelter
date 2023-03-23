const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../Models/userModel');
require('dotenv').config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLECLIENTID,
      clientSecret: process.env.GOOGLECLIENTSECRET,
      callbackURL: process.env.GOOGLECALLBACKURL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await User.findOne({ email });
        if (!user) {
          const [name, lastName] = profile.displayName.split(' ');
          user = await User.create({
            name,
            lastName,
            email
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize el usuario para almacenarlo en la sesión
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserialize el usuario a partir del identificador almacenado en la sesión
passport.deserializeUser(function (id, done) {
  const fnDeserialize = (err, user = User.findById(id)) => {
    done(err, user);
  };
  fnDeserialize();
});

module.exports = passport;
