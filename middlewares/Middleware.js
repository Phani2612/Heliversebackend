const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  try {
    // Get the token from cookies
    const token = req.cookies.Token;

 

    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: "Access Denied. No Token Provided." });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or Expired Token." });
      }

      // Attach decoded user information to the request object
      req.user = decoded;
      next(); // Proceed to the next middleware/route handler
    });
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = authenticateToken;
