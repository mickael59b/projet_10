import React from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import AppRoutes from './routes/';

const App = () => {
  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
};

export default App;
