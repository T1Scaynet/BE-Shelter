const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const Role = require('../Models/roleModel');
require('dotenv').config();

const authToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];

    if (token) {
      const verify = jwt.verify(token, process.env.PRIVATE_TOKEN);

      req.userId = verify;

      const user = await User.findById(req.userId, { password: 0 });
      console.log(user);
      if (!user) return res.status(404).json({ msg: 'No user found.' });
      next();
    } else {
      return res.status(403).json({
        msg: 'No token provided.'
      });
    }
  } catch (error) {
    return res.status(401).json({
      msg: 'Unathorized.'
    });
  }
};

const isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'moderator') {
        next();
        return;
      }
    }
    return res.status(403).json({
      msg: 'Requer Moderator role.'
    });
  } catch (error) {
    return res.status(403).json({
      msg: 'Requer Moderator role.'
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'admin') {
        next();
        return;
      }
    }
    return res.status(403).json({
      msg: 'Require Admin role.'
    });
  } catch (error) {
    return res.status(403).json({
      msg: 'Require Admin role.'
    });
  }
};

module.exports = {
  authToken,
  isModerator,
  isAdmin
};
