import Header from '@/components/Header';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AdminLayout = ({ children }: any) => {
  return (
    <>
      <Header />
      <main className='p-4'>{children}</main>
    </>
  );
};

export default AdminLayout;
