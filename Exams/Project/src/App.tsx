import { useState } from 'react';
import Header from './components/header/header';
import Home from './components/home/home';
import Footer from './components/footer/footer';
import Catalog from './components/catalog/catalog';
import Profile from './components/profile/profile';
import Delivery from './components/delivery/delivery';
import Product from './components/product/product';

import { startSnippet } from './constants/constants';

function App() {

  const [currentPage, setCurrentPage] = useState('home'); // Состояние для управления страницей
  const [currentCatalogTitle, setCatalogTitle] = useState(''); // Состояние для управления названием каталога
  const [currenCatalogId, setCurrenCatalogId] = useState(0); //Состояние хранящее id каталога
  const [currentSnippet, setCurrentSnippet] = useState(startSnippet); // Состояние для хранения данных сниппета

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} setCurrentSnippet={setCurrentSnippet} setCatalogTitle={setCatalogTitle} setCurrenCatalogId={setCurrenCatalogId}/>;
      case 'catalog':
        return <Catalog setCurrentPage={setCurrentPage} setCurrentSnippet={setCurrentSnippet} title={currentCatalogTitle} categoryId={currenCatalogId}/>;
      case 'profile':
        return <Profile />
      case 'delivery':
        return <Delivery />
      case 'product':
        return <Product product={currentSnippet} setCurrentSnippet={setCurrentSnippet}/>
      default:
        return <Home setCurrentSnippet={setCurrentSnippet} setCurrentPage={setCurrentPage} setCatalogTitle={setCatalogTitle} setCurrenCatalogId={setCurrenCatalogId}/>;
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