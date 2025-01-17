import type { CategoryImage } from "../../../types/types"

import './category.scss'

type CategoryProps = {
    category: CategoryImage;
}

function Category({ category }: CategoryProps) {
    return (
        <li className="categories__item">
            <img src={category.src} alt={category.name} className="categories__item-img" />
            <p className="categories__item-title">{category.name}</p>
        </li>
    )
}
export default Category