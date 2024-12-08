import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { validateToken } from '@/middleware/auth';

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const veiculos = await prisma.veiculo.findMany({
      where: { empresaUuid: req.empresa.uuid },
    });
    if (!veiculos || veiculos.length === 0) {
      return res.status(404).json({ message: 'Nenhum veículo encontrado' });
    }
    return res.status(200).json(veiculos);
  } catch (error) {
    console.error('Erro ao buscar veículos:', error);
    return res.status(500).json({ message: 'Erro ao buscar veículos' });
  }
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { marca, modelo, ano, preco, observacoes } = req.body;
    const newVeiculo = await prisma.veiculo.create({
      data: {
        marca,
        modelo,
        ano,
        preco,
        observacoes,
        empresaUuid: req.empresa.uuid,
        slug: `${marca}-${modelo}-${preco}`,
      },
    });
    return res.status(201).json(newVeiculo);
  } catch (error) {
    console.error('Erro ao criar veículo:', error);
    return res.status(500).json({ message: 'Erro ao criar veículo' });
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

  if (req.method === 'POST') {
    return handlePost(req, res);
  }

  return res.status(405).json({ message: 'Método não permitido' });
}
