import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { validateToken } from '@/middleware/auth';

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const empresa = await prisma.empresa.findUnique({
      where: { uuid: req.empresa.uuid },
    });

    if (!empresa) {
      return res.status(404).json({ message: 'Empresa não encontrada' });
    }

    return res.status(200).json(empresa);
  } catch (error) {
    console.error('Erro ao carregar empresa:', error);
    return res.status(500).json({ message: 'Erro ao carregar empresa' });
  }
};

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { nome, email, telefone, dominio } = req.body;

    if (!nome || !email || !dominio) {
      return res.status(400).json({
        message: 'Os campos nome, email e domínio são obrigatórios.',
      });
    }

    const updatedEmpresa = await prisma.empresa.update({
      where: { uuid: req.empresa.uuid },
      data: {
        nome,
        email,
        telefone,
        dominio,
      },
    });

    return res.status(200).json(updatedEmpresa);
  } catch (error) {
    console.error('Erro ao atualizar empresa:', error);
    return res.status(500).json({ message: 'Erro ao atualizar empresa' });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await new Promise((resolve, reject) => {
    validateToken(req, res, (result: unknown) =>
      result instanceof Error ? reject(result) : resolve(result)
    );
  });

  if (req.method === 'GET') {
    return handleGet(req, res);
  }

  if (req.method === 'PUT') {
    return handlePut(req, res);
  }

  return res.status(405).json({ message: 'Método não permitido' });
}
