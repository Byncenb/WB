import React, { useState } from 'react';

import lensIcon from '/header/icons/lens.svg';
import './search.scss'

import { getFilteredSuggestions } from './searchSuggestions/getFilteredSuggestions';
import Categories from '../categories/categories';
import { highlightMatch } from './searchSuggestions/highlightMatch';


function Search() {
    const [isOpen, setIsOpen] = useState(false); // Состояние для управления видимостью подсказок
    const [searchTerm, setSearchTerm] = useState(''); // Состояние для хранения текста поиска

    const handleInputClick = () => {
        setIsOpen(true); // Открываем подсказки при клике на input
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value); // Обновляем текст поиска
    };

    const handleBlur = () => {
        setIsOpen(false); // Закрываем подсказки при потере фокуса
    };

    const filteredSuggestions = getFilteredSuggestions(searchTerm);

    return (
        <div className="header__search">
            <div className="header__search-input-wrapper">
                <img src={lensIcon} alt="Лупа" className="header__search-icon" />
                <input
                    type="text"
                    className="header__search-input"
                    placeholder="Поиск товаров"
                    onClick={handleInputClick}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                />
            </div>
            {isOpen && (
                <>
                    <div className="header__search-suggestions">
                        <ul className="header__search-suggestions-list">
                            {filteredSuggestions.length > 0 ? (
                                filteredSuggestions.map((suggestion, index) => (
                                    <li className="header__search-suggestions-item" key={index}>{highlightMatch(suggestion, searchTerm)}</li>
                                ))
                            ) : (
                                <li className="header__search-suggestions-item">{searchTerm}</li>
                            )}
                        </ul>
                        <ul className="header__search-suggestions-list-categories">
                            <Categories searchTerm={searchTerm} />
                        </ul>
                    </div>
                    <div className="overflow"></div>
                </>
            )}
        </div>
    );
}

export default Search;