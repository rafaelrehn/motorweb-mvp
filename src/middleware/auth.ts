import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export const validateToken = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  const authHeader = req.headers.authorization;

  console.log(authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.empresa = decoded;
    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Token inválido ou expirado', error });
  }
};