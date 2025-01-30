import { useState } from 'react';
import Header from './components/header/header';
import Home from './components/home/home';
import Footer from './components/footer/footer';
import Catalog from './components/catalog/catalog';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // Состояние для управления страницей
  const [currentCatalogTitle, setCatalogTitle] = useState(''); // Состояние для управления названием каталога
  const [currenCatalogId, setCurrenCatalogId] = useState(0);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'catalog':
        return <Catalog title={currentCatalogTitle} categoryId={currenCatalogId}/>;
      default:
        return <Home />;
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