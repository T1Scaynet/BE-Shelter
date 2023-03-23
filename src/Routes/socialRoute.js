const passport = require('../Controllers/googleAuthController');
const { Router } = require('express');
const router = Router();

// Ruta de autenticación de Google
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);
// Ruta de callback de Google
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  (req, res) => {
    // Si la autenticación es exitosa, redirige al usuario a la página de inicio de tu aplicación
    res.redirect('http://localhost:5173/');
  }
);

// Ruta de cierre de sesión
router.get('/logout', function (req, res) {
  req.logout(function () {
    res.redirect('http://localhost:5173/');
  });
});

module.exports = router;
