import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, password, nome, telefone, dominio } = req.body;

    try {
      const novaEmpresa = await prisma.empresa.create({
        data: { email, password, nome, telefone, dominio },
      });

      res.status(201).json(novaEmpresa);
    } catch (error) {
      console.error('Erro ao criar empresa:', error);
      res.status(500).json({ message: 'Erro ao criar empresa', error });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
