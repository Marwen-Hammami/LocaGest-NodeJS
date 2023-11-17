import crypto from 'crypto';
import jwt from 'jsonwebtoken';


const secretKey = '756d47db75d3e5fdd75aed04700046c52f0d6125ac8ba18eba1b4c3c3552aadf';

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized: Missing Authorization header.' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden: Invalid token or token expired.' });
        }

        req.user = user;
        next();
    });
}

export { authenticate };