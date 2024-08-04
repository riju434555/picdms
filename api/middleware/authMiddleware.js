const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token) {
      // Remove 'Bearer ' from token
      token = token.split(" ")[1];
      // Verify JWT token
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.error(err);
          return res
            .status(401)
            .json({ message: "Unauthorized1 user", code: -2 });
        } else {
          // If token is valid, set userId in request object
          req.Id = decoded.ID; // Assuming your JWT payload has 'id' field
          next();
        }
      });
    } else {
      return res.status(401).json({ message: "Unauthorized2 user" });
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Unauthorized3 user" });
  }
};

module.exports = auth;
