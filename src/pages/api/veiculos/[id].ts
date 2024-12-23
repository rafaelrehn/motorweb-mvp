import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { validateToken } from '@/middleware/auth';

const handleGet = async (id: string, res: NextApiResponse) => {
  try {
    const veiculo = await prisma.veiculo.findUnique({
      where: { uuid: id },
    });
    if (!veiculo) {
      return res.status(404).json({ message: 'Veículo não encontrado' });
    }
    return res.status(200).json(veiculo);
  } catch (error) {
    console.error('Erro ao buscar veículo:', error);
    return res.status(500).json({ message: 'Erro ao buscar veículo' });
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handlePut = async (id: string, body: any, res: NextApiResponse) => {
  try {
    const { marca, modelo, ano, preco, observacoes } = body;
    const updatedVeiculo = await prisma.veiculo.update({
      where: { uuid: id },
      data: { marca, modelo, ano, preco, observacoes },
    });
    return res.status(200).json(updatedVeiculo);
  } catch (error) {
    console.error('Erro ao atualizar veículo:', error);
    return res.status(500).json({ message: 'Erro ao atualizar veículo' });
  }
};

const handleDelete = async (id: string, res: NextApiResponse) => {
  try {
    await prisma.veiculo.delete({
      where: { uuid: id },
    });
    return res.status(204).end();
  } catch (error) {
    console.error('Erro ao deletar veículo:', error);
    return res.status(500).json({ message: 'Erro ao deletar veículo' });
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

  const { id } = req.query;
  const method = req.method;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'ID inválido ou não fornecido' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const methods: { [key: string]: Function } = {
    GET: () => handleGet(id, res),
    PUT: () => handlePut(id, req.body, res),
    DELETE: () => handleDelete(id, res),
  };

  const action = methods[method!];

  if (action) {
    return action();
  } else {
    return res.status(405).json({ message: 'Método não permitido' });
  }
}
