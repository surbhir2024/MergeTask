const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
  const token = req.cookies.accesstoken;
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    jwt.verify(token, 'your-secret-key');
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: 'Invalid token' });
  }
};
module.exports = verifyJWT