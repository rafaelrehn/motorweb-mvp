import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Registrar() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    telefone: '',
    dominio: '',
  });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Empresa registrada com sucesso! Redirecionando...');
        setTimeout(() => router.push('/auth/entrar'), 2000);
      } else {
        const error = await response.json();
        setMessage(`Erro: ${error.message}`);
      }
    } catch (error) {
      console.error('Erro ao registrar empresa:', error);
      setMessage('Erro ao registrar empresa.');
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10'>
      <h1 className='text-2xl font-bold mb-4'>Registrar Empresa</h1>
      {message && <p className='mb-4 text-red-600'>{message}</p>}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          name='nome'
          placeholder='Nome da Empresa'
          value={formData.nome}
          onChange={handleChange}
          className='w-full px-4 py-2 border rounded'
          required
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
          className='w-full px-4 py-2 border rounded'
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Senha'
          value={formData.password}
          onChange={handleChange}
          className='w-full px-4 py-2 border rounded'
          required
        />
        <input
          type='text'
          name='telefone'
          placeholder='Telefone'
          value={formData.telefone}
          onChange={handleChange}
          className='w-full px-4 py-2 border rounded'
        />
        <input
          type='text'
          name='dominio'
          placeholder='Domínio'
          value={formData.dominio}
          onChange={handleChange}
          className='w-full px-4 py-2 border rounded'
        />
        <button
          type='submit'
          className='w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
        >
          Registrar
        </button>
      </form>
      <div className='mt-4 text-center'>
        <p>Já tem uma conta?</p>
        <button
          onClick={() => router.push('/auth/entrar')}
          className='mt-2 bg-gray-600 text-white px-6 py-1 text-sm rounded hover:bg-gray-700'
        >
          Fazer Login
        </button>
      </div>
    </div>
  );
}
