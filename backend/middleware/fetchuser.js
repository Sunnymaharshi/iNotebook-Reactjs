var jwt = require("jsonwebtoken");

const fetchuser = async (req, res, next) => {
  // get user from jwt token and id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using valid token" });
  }
  try {
    const JWT_SECRET = "shhhh";
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({
      error: "Please authenticate using valid token",
      err: error
    });
  }
};
module.exports = fetchuser;
