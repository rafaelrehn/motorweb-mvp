import { useState } from 'react';

export default function CreatePage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nome: '',
    telefone: '',
    dominio: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/empresas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Empresa criada com sucesso!');
        setFormData({
          email: '',
          password: '',
          nome: '',
          telefone: '',
          dominio: '',
        });
      } else {
        const error = await response.json();
        setMessage(`Erro: ${error.message}`);
      }
    } catch (error) {
      console.error(error);
      setMessage('Erro ao criar empresa.');
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10'>
      <h1 className='text-2xl font-bold mb-4'>Nova Empresa</h1>
      {message && <p className='mb-4 text-red-600'>{message}</p>}
      <form onSubmit={handleSubmit} className='space-y-4'>
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
          name='nome'
          placeholder='Nome'
          value={formData.nome}
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
          placeholder='Dominio'
          value={formData.dominio}
          onChange={handleChange}
          className='w-full px-4 py-2 border rounded'
          required
        />
        <button
          type='submit'
          className='w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
        >
          Criar Empresa
        </button>
      </form>
    </div>
  );
}
