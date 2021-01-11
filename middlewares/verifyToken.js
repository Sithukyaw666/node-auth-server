const jwt = require("jsonwebtoken");
function verufyToken(req, res, next) {
  const token = req ? req.cookies.authToken : "";
  if (!token)
    return res.status(401).json({
      user: null,
    });
  try {
    const verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
    res.user = verifiedUser.user;
    next();
  } catch {
    res.status(401).send("invalid token");
  }
}
module.exports = verufyToken;
