import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Veiculo } from '@/model/veiculo.type';

export default function VeiculoForm() {
  const router = useRouter();
  const { id } = router.query;
  const [veiculo, setVeiculo] = useState<Veiculo>({
    marca: '',
    modelo: '',
    ano: '',
    preco: 0,
    observacoes: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id && id !== 'new') {
      async function fetchVeiculo() {
        try {
          const response = await fetch(`/api/veiculos/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              authorization: String(localStorage.getItem('token')),
            },
          });
          if (response.ok) {
            const data = await response.json();
            setVeiculo(data);
          } else {
            console.error('Erro ao buscar veículo:', response.statusText);
          }
        } catch (error) {
          console.error('Erro de conexão:', error);
        }
      }
      fetchVeiculo();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setVeiculo({
      ...veiculo,
      [name]: name === 'preco' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const method = id === 'new' ? 'POST' : 'PUT';
    const url = id === 'new' ? '/api/veiculos' : `/api/veiculos/${id}`;
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          authorization: String(localStorage.getItem('token')),
        },
        body: JSON.stringify(veiculo),
      });
      if (response.ok) {
        setMessage('Veículo salvo com sucesso!');
        router.push('/admin/veiculos');
      } else {
        const error = await response.json();
        setMessage(`Erro: ${error.message}`);
      }
    } catch (error) {
      console.error(error);
      setMessage('Erro ao salvar veículo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-md mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>
        {id === 'new' ? 'Criar Veículo' : 'Editar Veículo'}
      </h1>
      {message && <p className='mb-4 text-red-600'>{message}</p>}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label
            htmlFor='marca'
            className='block text-sm font-medium text-gray-700'
          >
            Marca
          </label>
          <input
            id='marca'
            type='text'
            name='marca'
            placeholder='Marca'
            value={veiculo.marca}
            onChange={handleChange}
            className='w-full px-4 py-2 border rounded'
            required
          />
        </div>

        <div>
          <label
            htmlFor='modelo'
            className='block text-sm font-medium text-gray-700'
          >
            Modelo
          </label>
          <input
            id='modelo'
            type='text'
            name='modelo'
            placeholder='Modelo'
            value={veiculo.modelo}
            onChange={handleChange}
            className='w-full px-4 py-2 border rounded'
            required
          />
        </div>

        <div>
          <label
            htmlFor='ano'
            className='block text-sm font-medium text-gray-700'
          >
            Ano
          </label>
          <input
            id='ano'
            type='text'
            name='ano'
            placeholder='Ano'
            value={veiculo.ano}
            onChange={handleChange}
            className='w-full px-4 py-2 border rounded'
            required
          />
        </div>

        <div>
          <label
            htmlFor='preco'
            className='block text-sm font-medium text-gray-700'
          >
            Preço
          </label>
          <input
            id='preco'
            type='number'
            name='preco'
            placeholder='Preço'
            value={veiculo.preco}
            onChange={handleChange}
            className='w-full px-4 py-2 border rounded'
            required
          />
        </div>

        <div>
          <label
            htmlFor='observacoes'
            className='block text-sm font-medium text-gray-700'
          >
            Observações
          </label>
          <textarea
            id='observacoes'
            name='observacoes'
            placeholder='Observações'
            value={veiculo.observacoes}
            onChange={handleChange}
            className='w-full px-4 py-2 border rounded'
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}
