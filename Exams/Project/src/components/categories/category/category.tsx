import type { CategoryImage } from "../../../types/types"
import { highlightMatch } from "../../search/searchSuggestions/highlightMatch";

import './category.scss'

type CategoryProps = {
    category: CategoryImage;
    searchTerm?: string;
}

function Category({ category, searchTerm }: CategoryProps) {
    return (
        <li className="categories__item">
            <img src={category.src} alt={category.name} className="categories__item-img" />
            <p className="categories__item-title">{searchTerm ? highlightMatch(category.name, searchTerm) : category.name}</p>
        </li>
    )
}
export default Category