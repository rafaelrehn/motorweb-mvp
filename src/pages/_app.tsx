import Header from '@/components/Header';
import '../app/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <div className='p-4'>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
