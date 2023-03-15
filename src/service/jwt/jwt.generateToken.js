import jwt from 'jsonwebtoken';

export function generateJsonWebToken(payload, duration) {
    const options = { expiresIn: `${duration}` };
    return jwt.sign(payload, process.env.JWT_SECRET, options);
}