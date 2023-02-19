import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: number;
}

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the request headers
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header not found' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token and get the payload
    const payload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    // Add the user ID to the request object
    req.userId = payload.userId;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
