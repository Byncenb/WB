import Search from "../search/search"
import cartIcon from "/header/icons/cart.svg"
import deliveryIcon from "/header/icons/delivery.svg"
import favoritesIcon from "/header/icons/favorites.svg"
import profileIcon from "/header/icons/profile.svg"
import "./header.scss"

function Header() {
  return (
    <div className="header">
      <h4 className="header__title">магаз</h4>
      <Search/>
      <div className="header__icons">
        <img src={cartIcon} alt="Корзина" className="header__icon-cart" />
        <img src={deliveryIcon} alt="Доставка" className="header__icon-delivery" />
        <img src={favoritesIcon} alt="Избранное" className="header__icon-favorites" />
        <img src={profileIcon} alt="Профиль" className="header__icon-profile" />
      </div>
    </div>
  )
}

export default Header
