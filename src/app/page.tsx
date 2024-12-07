import Head from 'next/head';

import './globals.css';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <Head>
        <title>Motorweb MVP</title>
        <meta name='description' content='Bem-vindo ao Motorweb' />
      </Head>

      <header className='w-full bg-blue-600 text-white py-4 shadow-md'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-2xl font-bold'>Motorweb</h1>
          <p className='text-sm'>Seu website para anúncios de veículos</p>
        </div>
      </header>

      <main className='flex flex-col items-center justify-center flex-grow px-4'>
        <h2 className='text-3xl font-bold text-gray-800'>
          Bem-vindo ao Motorweb
        </h2>
        <p className='text-lg text-gray-600 mt-4'>
          Aqui será a plataforma para gestão e exibição de veículos.
        </p>
        <a
          href='#'
          className='mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700'
        >
          Entrar
        </a>
      </main>

      <footer className='w-full bg-gray-800 text-white py-4'>
        <div className='text-center text-sm'>
          © {new Date().getFullYear()} Motorweb. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
