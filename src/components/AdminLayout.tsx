import Header from '@/components/Header';

const AdminLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className='p-4'>{children}</main>
    </>
  );
};

export default AdminLayout;
