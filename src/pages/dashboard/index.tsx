import { useRouter } from 'next/router';
export default function Dashboard() {
  const router = useRouter();

  return (
    <div className='max-w-4xl mx-auto mt-10'>
      <h1 className='text-3xl font-bold mb-6'>Bem-vindo(a)!</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='p-4 border rounded-lg shadow hover:shadow-md'>
          <h2 className='text-xl font-bold'>Gerenciar Veículos</h2>
          <p className='text-gray-600'>Adicione, edite ou remova veículos.</p>
          <button
            onClick={() => router.push('/veiculos')}
            className='mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
          >
            Ir para Veículos
          </button>
        </div>
        <div className='p-4 border rounded-lg shadow hover:shadow-md'>
          <h2 className='text-xl font-bold'>Configurações</h2>
          <p className='text-gray-600'>Gerencie os dados da sua empresa.</p>
          <button
            onClick={() => router.push('/configuracoes')}
            className='mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700'
          >
            Ir para Configurações
          </button>
        </div>
      </div>
    </div>
  );
}
