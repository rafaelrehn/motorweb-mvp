import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Header() {
  const [empresa, setEmpresa] = useState<{ id: string; nome: string } | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const empresa = localStorage.getItem('empresa');
    if (empresa) {
      const empresaParsed = JSON.parse(empresa);
      setEmpresa(empresaParsed);
    }
  }, []);

  const handleLogoff = async () => {
    try {
      localStorage.removeItem('empresa');
      router.push('/auth/entrar');
    } catch (error) {
      console.error('Erro ao fazer logoff:', error);
    }
  };

  return (
    <header className='bg-gray-800 text-white py-4 px-6'>
      <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
        <div className='flex flex-col md:flex-row items-center space-x-4'>
          <h1
            className='text-lg font-bold cursor-pointer'
            onClick={() => router.push('/dashboard')}
          >
            Meu Sistema
          </h1>
          <nav className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4'>
            <button
              onClick={() => router.push('/dashboard')}
              className='hover:underline'
            >
              Dashboard
            </button>
            <button
              onClick={() => router.push('/veiculos')}
              className='hover:underline'
            >
              Veículos
            </button>
          </nav>
        </div>
        <div className='flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4'>
          {empresa && <span>Bem-vindo(a), {empresa.nome}</span>}
          <button
            onClick={handleLogoff}
            className='bg-red-600 px-3 py-1 rounded hover:bg-red-700'
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
