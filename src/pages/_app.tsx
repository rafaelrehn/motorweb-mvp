import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';
import '../app/globals.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  const router = useRouter();

  if (router.pathname.startsWith('/admin')) {
    return (
      <AdminLayout>
        <Component {...pageProps} />
      </AdminLayout>
    );
  }

  return <Component {...pageProps} />;
}

export default MyApp;
