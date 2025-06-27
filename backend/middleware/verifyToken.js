const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

// Middleware to check if a request has a valid JWT
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Token must be in format: Bearer <token>
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized. Token missing." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Add user info to request
        next(); // Proceed to next handler
    } catch (err) {
        res.status(403).json({ error: "Invalid or expired token." });
    }
};

module.exports = verifyToken;
