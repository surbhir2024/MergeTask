const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
  const token = req.cookies.accesstoken;
  const secretkey = process.env.WT_SECRET_KEY
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    jwt.verify(token, secretkey);
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: 'Invalid token' });
  }
};
module.exports = verifyJWT