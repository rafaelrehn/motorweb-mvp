import { useEffect, useState } from 'react';
import Link from 'next/link';

type Veiculo = {
  empresaUuid: string;
  uuid: string;
  marca: string;
  modelo: string;
  ano: string;
  preco: number;
  slug: string;
  observacoes: string | null;
};

export default function VeiculosList() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchVeiculos() {
      try {
        const response = await fetch('/api/veiculos');
        if (response.ok) {
          const data = await response.json();
          setVeiculos(data);
        } else {
          console.error('Erro ao buscar veículos:', response.statusText);
        }
      } catch (error) {
        console.error('Erro de conexão:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVeiculos();
  }, []);

  const handleDelete = async (uuid: string) => {
    if (confirm('Tem certeza que deseja excluir este veículo?')) {
      try {
        const response = await fetch(`/api/veiculos/${uuid}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setMessage('Veículo excluído com sucesso!');
          setVeiculos(veiculos.filter((veiculo) => veiculo.uuid !== uuid));
        } else {
          const error = await response.json();
          setMessage(`Erro: ${error.message}`);
        }
      } catch (error) {
        console.error('Erro ao excluir veículo:', error);
        setMessage('Erro ao excluir veículo.');
      }
    }
  };

  if (loading) return <p>Carregando veículos...</p>;

  return (
    <div className='max-w-6xl mx-auto mt-10'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Lista de Veículos</h1>
        <Link
          href='/veiculos/new'
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
        >
          + Novo Veículo
        </Link>
      </div>
      {message && <p className='mb-4 text-red-600'>{message}</p>}
      <div className='overflow-x-auto'>
        <table className='table-auto w-full border-collapse border border-gray-200'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border border-gray-300 px-4 py-2 text-left'>
                Marca
              </th>
              <th className='border border-gray-300 px-4 py-2 text-left'>
                Modelo
              </th>
              <th className='border border-gray-300 px-4 py-2 text-left'>
                Ano
              </th>
              <th className='border border-gray-300 px-4 py-2 text-left'>
                Preço
              </th>
              <th className='border border-gray-300 px-4 py-2 text-center'>
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {veiculos.map((veiculo) => (
              <tr key={veiculo.uuid} className='hover:bg-gray-50'>
                <td className='border border-gray-300 px-4 py-2'>
                  {veiculo.marca}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {veiculo.modelo}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {veiculo.ano}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  R$ {veiculo.preco.toLocaleString('pt-BR')}
                </td>
                <td className='border border-gray-300 px-4 py-2 text-center'>
                  <Link
                    href={`/veiculos/${veiculo.uuid}`}
                    className='bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2'
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(veiculo.uuid)}
                    className='bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700'
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
