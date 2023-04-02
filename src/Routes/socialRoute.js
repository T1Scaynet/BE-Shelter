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
    res.redirect(`http://localhost:5173/?sesion=${req.user.token}`);
    return res.status(200).json({
      msg: req.user.msjLogin,
      auth: true,
      user: req.user,
      token: req.user.token
    });
  }
);

// Ruta de cierre de sesión
router.get('/logout', function (req, res) {
  req.logout(function () {
    //  res.redirect('http://localhost:5173/');
    return res.status(200).json({
      msg: 'Se cerro la sesion de Google correctamente.'
    });
  });
});

module.exports = router;
