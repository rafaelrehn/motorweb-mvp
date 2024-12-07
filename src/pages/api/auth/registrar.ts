import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import bcrypt from 'bcrypt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === 'POST') {
    return handleRegister(req, res);
  }

  return res.status(405).json({ message: 'Método não permitido' });
}

const handleRegister = async (req: NextApiRequest, res: NextApiResponse) => {
  const { nome, email, password, telefone, dominio } = req.body;

  if (!nome || !email || !password) {
    return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const novaEmpresa = await prisma.empresa.create({
      data: {
        nome,
        email,
        password: hashedPassword,
        telefone,
        dominio,
        ativo: true,
      },
    });

    return res.status(201).json({
      message: 'Empresa criada com sucesso!',
      empresa: { id: novaEmpresa.uuid, nome: novaEmpresa.nome },
    });
  } catch (error) {
    console.error('Erro ao registrar empresa:', error);
    return res.status(500).json({ message: 'Erro ao registrar empresa' });
  }
};
