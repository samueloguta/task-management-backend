const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return next(new ErrorResponse('Not authorized', 401));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    next(new ErrorResponse('Not authorized', 401));
  }
};

exports.authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new ErrorResponse(`Role ${req.user.role} is unauthorized`, 403));
  }
  next();
};
jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  if (err) throw new Error('Invalid token');
  req.userId = decoded.userId;
});