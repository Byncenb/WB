import { useState } from 'react';
import Header from './components/header/header';
import Home from './components/home/home';
import Footer from './components/footer/footer';
import Catalog from './components/catalog/catalog';
import Profile from './components/profile/profile';
import Delivery from './components/delivery/delivery';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // Состояние для управления страницей
  const [currentCatalogTitle, setCatalogTitle] = useState(''); // Состояние для управления названием каталога
  const [currenCatalogId, setCurrenCatalogId] = useState(0);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} setCatalogTitle={setCatalogTitle} setCurrenCatalogId={setCurrenCatalogId}/>;
      case 'catalog':
        return <Catalog title={currentCatalogTitle} categoryId={currenCatalogId}/>;
      case 'profile':
        return <Profile />
      case 'delivery':
        return <Delivery />
      default:
        return <Home setCurrentPage={setCurrentPage} setCatalogTitle={setCatalogTitle} setCurrenCatalogId={setCurrenCatalogId}/>;
    }
  };

  return (
    <>
      <Header setCurrentPage={setCurrentPage} setCatalogTitle={setCatalogTitle} setCurrenCatalogId={setCurrenCatalogId}/>
      {renderPage()}
      <Footer />
    </>
  );
}

export default App;