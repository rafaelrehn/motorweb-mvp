import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Entrar() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/entrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const { empresa, token } = data;
        localStorage.setItem('empresa', JSON.stringify(empresa));
        localStorage.setItem('token', String('Bearer ' + token));
        setMessage('Login bem-sucedido! Redirecionando...');
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        const error = await response.json();
        setMessage(`Erro: ${error.message}`);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setMessage('Erro ao fazer login.');
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10'>
      <h1 className='text-2xl font-bold mb-4'>Entrar</h1>
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
        <button
          type='submit'
          className='w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
        >
          Entrar
        </button>
      </form>
      <div className='mt-4 text-center'>
        <p>Não tem uma conta?</p>
        <button
          onClick={() => router.push('/auth/registrar')}
          className='mt-2 bg-gray-600 text-white px-6 py-1 text-sm rounded hover:bg-gray-700'
        >
          Registrar
        </button>
      </div>
    </div>
  );
}
