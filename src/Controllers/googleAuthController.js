const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../Models/userModel');
const Role = require('../Models/roleModel');
const jwt = require('jsonwebtoken');
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
        console.log(profile);
        const email = profile.emails[0].value;
        let user = await User.findOne({ email }).populate('roles');
        if (!user) {
          const [name, lastName] = profile.displayName.split(' ');
          const role = await Role.findOne({ name: 'client' });
          const active = true;
          user = new User({
            name,
            lastName,
            email,
            roles: [role.id],
            active,
            avatar: profile?.photos?.[0]?.value || ''
          });
          await user.save();
          user.msjLogin = 'Usuario creado correctamente.';
        }
        // Le asigno un token al usuario
        user.token = jwt.sign(user._id.toString(), process.env.PRIVATE_TOKEN);
        user.msjLogin = user.msjLogin || 'Inicio de sesion satisfactorio.';
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
