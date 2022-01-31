import { useEffect } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = ({ title, children }) => {
  useEffect(() => {
    document.title = title ? `${title} | LOOKBOUTIQUESTORE` : 'LOOKBOUTIQUESTORE';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [title]);

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
