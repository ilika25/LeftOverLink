const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized. Token missing." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = {
            _id:decoded._id,
            email: decoded.email,
            role: decoded.role,
            DonorName: decoded.DonorName||null,
            NgoName: decoded.NgoName||null  
        };
        next();
    } catch (err) {
        console.log("Invalid or expired token:", err.message);
        res.status(403).json({ error: "Invalid or expired token." });
    }
};

module.exports = verifyToken;
