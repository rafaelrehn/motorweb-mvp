import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import bcrypt from 'bcrypt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === 'POST') {
    return handleLogin(req, res);
  }

  return res.status(405).json({ message: 'Método não permitido' });
}

const handleLogin = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  try {
    const empresa = await prisma.empresa.findUnique({
      where: { email: String(email) },
    });
    if (
      !empresa ||
      !(await bcrypt.compare(String(password), empresa.password))
    ) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    return res.status(200).json({
      message: 'Login bem-sucedido',
      empresa,
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ message: 'Erro ao fazer login' });
  }
};
