import type { CategoryImage } from "../../../types/types"
import { highlightMatch } from "../../search/searchSuggestions/highlightMatch";

import './category.scss'

type CategoryProps = {
    category: CategoryImage;
    searchTerm?: string;
    setCurrentPage?: (page: 'home' | 'catalog' | 'profile' | 'delivery') => void;
    setCatalogTitle?: (title: string) => void;
    setIsOpen?: (isOpen: boolean) => void;
    setCurrenCatalogId?: (id: number) => void;
}

function Category({ category, searchTerm, setCurrentPage, setCatalogTitle, setIsOpen, setCurrenCatalogId }: CategoryProps) {
    const handleSuggestionClick = (suggestionName: string, categoryId: number) => {
        setCatalogTitle && setCatalogTitle(suggestionName); // Устанавливаем название каталога
        setCurrenCatalogId && setCurrenCatalogId(categoryId); // Устанавливаем id категории для каталожной выдачи
        setCurrentPage && setCurrentPage('catalog'); // Переход на страницу Catalog
        setIsOpen && setIsOpen(false); // Закрываем подсказки при потере фокуса
    };

    return (
        <li className="categories__item" onClick={() => handleSuggestionClick(category.name, category.id)}>
            <img src={category.src} alt={category.name} className="categories__item-img" />
            <p className="categories__item-title">{searchTerm ? highlightMatch(category.name, searchTerm) : category.name}</p>
        </li>
    )
}
export default Category