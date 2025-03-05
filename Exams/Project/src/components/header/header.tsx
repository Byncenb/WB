import Search from "../search/search"
import cartIcon from "/header/icons/cart.svg"
import deliveryIcon from "/header/icons/delivery.svg"
import favoritesIcon from "/header/icons/favorites.svg"
import profileIcon from "/header/icons/profile.svg"
import "./header.scss"

type HeaderProps = {
  setCurrentPage: (page: 'home' | 'catalog' | 'profile' | 'delivery') => void;
  setCatalogTitle: (title: string) => void;
  setCurrenCatalogId: (id: number) => void;
}

function Header({ setCurrentPage, setCatalogTitle, setCurrenCatalogId }: HeaderProps) {
  return (
    <div className="header">
      <h4 className="header__title" onClick={() => setCurrentPage('home')}>магаз</h4>
      <Search 
      setCurrentPage={setCurrentPage}
      setCatalogTitle={setCatalogTitle}
      setCurrenCatalogId={setCurrenCatalogId}/>
      <div className="header__icons">
        <img src={cartIcon} alt="Корзина" className="header__icon-cart" />
        <img src={deliveryIcon} alt="Доставка" className="header__icon-delivery" onClick={() => setCurrentPage('delivery')}/>
        <img src={favoritesIcon} alt="Избранное" className="header__icon-favorites" />
        <img src={profileIcon} alt="Профиль" className="header__icon-profile" onClick={() => setCurrentPage('profile')}/>
      </div>
    </div>
  )
}

export default Header
