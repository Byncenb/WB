import React, { useState } from 'react';

import lensIcon from '/header/icons/lens.svg';
import './search.scss'

import { getFilteredSuggestions } from './searchSuggestions/getFilteredSuggestions';
import Categories from '../categories/categories';
import { highlightMatch } from './searchSuggestions/highlightMatch';
import { PageName } from '../../types/types';

type SearchProps = {
    setCurrentPage: (page: PageName) => void;
    setCatalogTitle: (title: string) => void;
    setCurrenCatalogId: (id: number) => void;
}

function Search({ setCurrentPage, setCatalogTitle, setCurrenCatalogId }: SearchProps) {
    const [isOpen, setIsOpen] = useState(false); // Состояние для управления видимостью подсказок
    const [searchTerm, setSearchTerm] = useState(''); // Состояние для хранения текста поиска

    const handleInputClick = () => {
        setIsOpen(true); // Открываем подсказки при клике на input
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value); // Обновляем текст поиска
    };

    const handleOverflowClick = () => {
        setIsOpen(false); // Закрываем подсказки при клике на overflow
    };

    const handleSuggestionClick = (suggestionName: string) => {
        setCatalogTitle(suggestionName); // Устанавливаем название каталога
        setCurrenCatalogId(0); // Устанавливаем id категории, чтобы различать поисковую выдачу от выдачи по категории
        setCurrentPage('catalog'); // Переход на страницу Catalog
        setIsOpen(false); // Закрываем подсказки при потере фокуса
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') { // Если нажат Enter, выполняем переход на страницу каталога
            setCatalogTitle(searchTerm); // Устанавливаем название каталога
            setCurrenCatalogId(0); // Устанавливаем id категории, чтобы различать поисковую выдачу от выдачи по категории
            setCurrentPage('catalog'); // Переход на страницу Catalog
            setIsOpen(false); // Закрываем подсказки при потере фокуса
        }
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
                    onKeyDown={handleKeyDown}
                />
            </div>
            {isOpen && (
                <>
                    <div className="header__search-suggestions">
                        <ul className="header__search-suggestions-list">
                            {filteredSuggestions.length > 0 ? (
                                filteredSuggestions.map((suggestion, index) => (
                                    <li className="header__search-suggestions-item" onClick={() =>handleSuggestionClick(suggestion)} key={index}>
                                        <p className="header__search-suggestions-item-text">{highlightMatch(suggestion, searchTerm)}</p>
                                        <img src="/header/icons/suggestions/cross.svg" alt="" className="header__search-suggestions-cross" />
                                    </li>
                                ))
                            ) : (
                                <li className="header__search-suggestions-item" onClick={() => handleSuggestionClick(searchTerm)}>
                                    <p className="header__search-suggestions-item-text">{searchTerm}</p>
                                    <img src="/header/icons/suggestions/cross.svg" alt="" className="header__search-suggestions-cross" />
                                </li>
                            )}
                        </ul>
                        <ul className="header__search-suggestions-list-categories">
                            <Categories
                            searchTerm={searchTerm}
                            setCurrentPage={setCurrentPage}
                            setCatalogTitle={setCatalogTitle}
                            setIsOpen={setIsOpen}
                            setCurrenCatalogId={setCurrenCatalogId}/>
                        </ul>
                    </div>
                    <div className="overflow" onClick={handleOverflowClick}></div>
                </>
            )}
        </div>
    );
}

export default Search;