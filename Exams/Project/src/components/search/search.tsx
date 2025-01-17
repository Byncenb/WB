import lensIcon from '/header/icons/lens.svg';
import './search.scss'

function Search() {
    return (
        <div className="header__search">
            <img src={lensIcon} alt="Лупа" className="header__search-icon" />
            <input type="text" className="header__search-input" placeholder="Поиск товаров"/>
        </div>
    )
}

export default Search