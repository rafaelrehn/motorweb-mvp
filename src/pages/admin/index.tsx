import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.asPath === '/admin') {
      router.push('/admin/dashboard');
    }
  }, [router]);
  return <></>;
};

export default AdminPage;
