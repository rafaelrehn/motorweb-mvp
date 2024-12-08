import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function EditPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nome: '',
    telefone: '',
    dominio: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/empresas`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('token') || '',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          const error = await response.json();
          setMessage(`Erro ao carregar dados: ${error.message}`);
        }
      } catch (error) {
        console.error(error);
        setMessage('Erro ao carregar dados da empresa.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const response = await fetch(`/api/empresas`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token') || '',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Empresa atualizada com sucesso!');
        setTimeout(() => {
          router.push('/admin');
        }, 1000);
      } else {
        const error = await response.json();
        setMessage(`Erro: ${error.message}`);
      }
    } catch (error) {
      console.error(error);
      setMessage('Erro ao atualizar empresa.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className='max-w-md mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Editar Empresa</h1>
      {message && <p className='mb-4 text-red-600'>{message}</p>}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Email
          </label>
          <input
            id='email'
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            className='w-full px-4 py-2 border rounded'
            required
          />
        </div>

        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700'
          >
            Senha
          </label>
          <input
            id='password'
            type='password'
            name='password'
            placeholder='Senha'
            value={formData.password}
            onChange={handleChange}
            className='w-full px-4 py-2 border rounded'
            required
          />
        </div>

        <div>
          <label
            htmlFor='nome'
            className='block text-sm font-medium text-gray-700'
          >
            Nome
          </label>
          <input
            id='nome'
            type='text'
            name='nome'
            placeholder='Nome'
            value={formData.nome}
            onChange={handleChange}
            className='w-full px-4 py-2 border rounded'
            required
          />
        </div>

        <div>
          <label
            htmlFor='telefone'
            className='block text-sm font-medium text-gray-700'
          >
            Telefone
          </label>
          <input
            id='telefone'
            type='text'
            name='telefone'
            placeholder='Telefone'
            value={formData.telefone}
            onChange={handleChange}
            className='w-full px-4 py-2 border rounded'
          />
        </div>

        <div>
          <label
            htmlFor='dominio'
            className='block text-sm font-medium text-gray-700'
          >
            Dominio
          </label>
          <input
            id='dominio'
            type='text'
            name='dominio'
            placeholder='Dominio'
            value={formData.dominio}
            onChange={handleChange}
            className='w-full px-4 py-2 border rounded'
            required
          />
        </div>

        <button
          type='submit'
          className='w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
        >
          {isSaving ? 'Atualizando' : 'Atualizar Empresa'}
        </button>
      </form>
    </div>
  );
}
